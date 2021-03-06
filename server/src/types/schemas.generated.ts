import { GraphQLResolveInfo } from "graphql"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Comic = {
  __typename?: "Comic"
  date?: Maybe<Scalars["Int"]>
  date_created: Scalars["Int"]
  date_updated: Scalars["Int"]
  description?: Maybe<Scalars["String"]>
  grade: Grade
  grade_id: Scalars["Int"]
  id: Scalars["ID"]
  issue_no: Scalars["Int"]
  series: Series
  title: Title
  title_id: Scalars["Int"]
}

export type ComicsPage = {
  __typename?: "ComicsPage"
  items?: Maybe<Array<Maybe<Comic>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type Grade = {
  __typename?: "Grade"
  abbr: Scalars["String"]
  id: Scalars["Int"]
  name: Scalars["String"]
  score: Scalars["Float"]
}

export type Mutation = {
  __typename?: "Mutation"
  updateTitle?: Maybe<Title>
}

export type MutationUpdateTitleArgs = {
  id: Scalars["Int"]
  update: UpdateTitleInput
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["String"]>
  hasNextPage?: Maybe<Scalars["Boolean"]>
  startCursor?: Maybe<Scalars["String"]>
}

export type Publisher = {
  __typename?: "Publisher"
  date_created: Scalars["Int"]
  date_updated: Scalars["Int"]
  id: Scalars["ID"]
  name: Scalars["String"]
  series?: Maybe<Series>
  title_count?: Maybe<Scalars["Int"]>
  titles?: Maybe<Array<Maybe<Title>>>
  url?: Maybe<Scalars["String"]>
}

export type PublishersPage = {
  __typename?: "PublishersPage"
  items?: Maybe<Array<Maybe<Publisher>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type Query = {
  __typename?: "Query"
  comic?: Maybe<Comic>
  comics?: Maybe<ComicsPage>
  publisher?: Maybe<Publisher>
  publishers?: Maybe<PublishersPage>
  title?: Maybe<Title>
  titles?: Maybe<TitlesPage>
}

export type QueryComicArgs = {
  id: Scalars["Int"]
}

export type QueryComicsArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisherId?: Maybe<Scalars["Int"]>
  titleId?: Maybe<Scalars["Int"]>
}

export type QueryPublisherArgs = {
  id: Scalars["Int"]
}

export type QueryPublishersArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
}

export type QueryTitleArgs = {
  id: Scalars["Int"]
}

export type QueryTitlesArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisherId?: Maybe<Scalars["Int"]>
}

export type Series = {
  __typename?: "Series"
  next?: Maybe<Scalars["ID"]>
  previous?: Maybe<Scalars["ID"]>
}

export type Title = {
  __typename?: "Title"
  date_created: Scalars["Int"]
  date_updated: Scalars["Int"]
  id: Scalars["ID"]
  issue_count?: Maybe<Scalars["Int"]>
  issues?: Maybe<Scalars["Int"]>
  name: Scalars["String"]
  publisher: Publisher
  publisher_id: Scalars["Int"]
  series?: Maybe<Series>
  url?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type TitlesPage = {
  __typename?: "TitlesPage"
  items?: Maybe<Array<Maybe<Title>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type UpdateTitleInput = {
  name?: Maybe<Scalars["String"]>
  publisher_id?: Maybe<Scalars["Int"]>
  url?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Comic: ResolverTypeWrapper<Comic>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  ComicsPage: ResolverTypeWrapper<ComicsPage>
  Grade: ResolverTypeWrapper<Grade>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Mutation: ResolverTypeWrapper<{}>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  Publisher: ResolverTypeWrapper<Publisher>
  PublishersPage: ResolverTypeWrapper<PublishersPage>
  Query: ResolverTypeWrapper<{}>
  Series: ResolverTypeWrapper<Series>
  Title: ResolverTypeWrapper<Title>
  TitlesPage: ResolverTypeWrapper<TitlesPage>
  UpdateTitleInput: UpdateTitleInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Comic: Comic
  Int: Scalars["Int"]
  String: Scalars["String"]
  ID: Scalars["ID"]
  ComicsPage: ComicsPage
  Grade: Grade
  Float: Scalars["Float"]
  Mutation: {}
  PageInfo: PageInfo
  Boolean: Scalars["Boolean"]
  Publisher: Publisher
  PublishersPage: PublishersPage
  Query: {}
  Series: Series
  Title: Title
  TitlesPage: TitlesPage
  UpdateTitleInput: UpdateTitleInput
}

export type ComicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comic"] = ResolversParentTypes["Comic"]
> = {
  date?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  date_created?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  date_updated?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  grade?: Resolver<ResolversTypes["Grade"], ParentType, ContextType>
  grade_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  issue_no?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  series?: Resolver<ResolversTypes["Series"], ParentType, ContextType>
  title?: Resolver<ResolversTypes["Title"], ParentType, ContextType>
  title_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ComicsPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComicsPage"] = ResolversParentTypes["ComicsPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comic"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GradeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Grade"] = ResolversParentTypes["Grade"]
> = {
  abbr?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  score?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  updateTitle?: Resolver<
    Maybe<ResolversTypes["Title"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTitleArgs, "id" | "update">
  >
}

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  endCursor?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  hasNextPage?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PublisherResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Publisher"] = ResolversParentTypes["Publisher"]
> = {
  date_created?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  date_updated?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  series?: Resolver<Maybe<ResolversTypes["Series"]>, ParentType, ContextType>
  title_count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  titles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Title"]>>>,
    ParentType,
    ContextType
  >
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PublishersPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PublishersPage"] = ResolversParentTypes["PublishersPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Publisher"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  comic?: Resolver<
    Maybe<ResolversTypes["Comic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryComicArgs, "id">
  >
  comics?: Resolver<
    Maybe<ResolversTypes["ComicsPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryComicsArgs, "afterCursor" | "beforeCursor" | "pageSize">
  >
  publisher?: Resolver<
    Maybe<ResolversTypes["Publisher"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPublisherArgs, "id">
  >
  publishers?: Resolver<
    Maybe<ResolversTypes["PublishersPage"]>,
    ParentType,
    ContextType,
    RequireFields<
      QueryPublishersArgs,
      "afterCursor" | "beforeCursor" | "pageSize"
    >
  >
  title?: Resolver<
    Maybe<ResolversTypes["Title"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTitleArgs, "id">
  >
  titles?: Resolver<
    Maybe<ResolversTypes["TitlesPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTitlesArgs, "afterCursor" | "beforeCursor" | "pageSize">
  >
}

export type SeriesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Series"] = ResolversParentTypes["Series"]
> = {
  next?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
  previous?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TitleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Title"] = ResolversParentTypes["Title"]
> = {
  date_created?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  date_updated?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  issue_count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  issues?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  publisher?: Resolver<ResolversTypes["Publisher"], ParentType, ContextType>
  publisher_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  series?: Resolver<Maybe<ResolversTypes["Series"]>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  volume?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  year?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TitlesPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TitlesPage"] = ResolversParentTypes["TitlesPage"]
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Title"]>>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Comic?: ComicResolvers<ContextType>
  ComicsPage?: ComicsPageResolvers<ContextType>
  Grade?: GradeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Publisher?: PublisherResolvers<ContextType>
  PublishersPage?: PublishersPageResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Series?: SeriesResolvers<ContextType>
  Title?: TitleResolvers<ContextType>
  TitlesPage?: TitlesPageResolvers<ContextType>
}
