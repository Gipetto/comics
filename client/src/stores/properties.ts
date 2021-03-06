import { writable, derived } from "svelte/store"

const PROPERTIES = "properties"

type Properties = {
  [key: string]: string | number
}

export const defaultState: Properties = {
  owner: "me",
  copyrightYear: 2021,
}

// Not worrying about fallback/shim because we're not doing SSR
const lStore = window.localStorage

const getStoredProperties = (): Properties => {
  const reviver = (_: string, value: string) => {
    if (!value) {
      console.log(`properties localStorage empty - initializing`)
      return defaultState
    } else {
      return value
    }
  }

  try {
    const props = JSON.parse(lStore.getItem(PROPERTIES), reviver)

    // upgrade the stored properties if they're missing new keys
    return {
      ...defaultState,
      ...props,
    }
  } catch (e) {
    console.log(
      `Could not parse properties localStorage, setting properties to defaults`,
      e
    )
    return defaultState
  }
}

const setStoredProperties = (properties: Properties) => {
  lStore.setItem(PROPERTIES, JSON.stringify(properties))
  return properties
}

/**
 * Writable store - use this for modifying properties
 */
export const propertiesStore = writable<Properties>(getStoredProperties())

/**
 * All consumers should use the stored properties object
 */
export const properties = derived(propertiesStore, ($a) =>
  setStoredProperties($a)
)
