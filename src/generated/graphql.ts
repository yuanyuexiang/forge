import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** ISO8601 Date values */
  Date: { input: any; output: any; }
  /** BigInt value */
  GraphQLBigInt: { input: any; output: any; }
  /** A Float or a String */
  GraphQLStringOrFloat: { input: any; output: any; }
  /** Hashed string values */
  Hash: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export enum EventEnum {
  Create = 'create',
  Delete = 'delete',
  Update = 'update'
}

export type Mutation = {
  __typename?: 'Mutation';
  create_boutiques_item?: Maybe<Boutiques>;
  create_boutiques_items: Array<Boutiques>;
  create_categories_item?: Maybe<Categories>;
  create_categories_items: Array<Categories>;
  create_customers_item?: Maybe<Customers>;
  create_customers_items: Array<Customers>;
  create_orders_item?: Maybe<Orders>;
  create_orders_items: Array<Orders>;
  create_products_item?: Maybe<Products>;
  create_products_items: Array<Products>;
  create_terminals_item?: Maybe<Terminals>;
  create_terminals_items: Array<Terminals>;
  create_views_item?: Maybe<Views>;
  create_views_items: Array<Views>;
  create_visits_item?: Maybe<Visits>;
  create_visits_items: Array<Visits>;
  create_wechat_users_item?: Maybe<Wechat_Users>;
  create_wechat_users_items: Array<Wechat_Users>;
  delete_boutiques_item?: Maybe<Delete_One>;
  delete_boutiques_items?: Maybe<Delete_Many>;
  delete_categories_item?: Maybe<Delete_One>;
  delete_categories_items?: Maybe<Delete_Many>;
  delete_customers_item?: Maybe<Delete_One>;
  delete_customers_items?: Maybe<Delete_Many>;
  delete_orders_item?: Maybe<Delete_One>;
  delete_orders_items?: Maybe<Delete_Many>;
  delete_products_item?: Maybe<Delete_One>;
  delete_products_items?: Maybe<Delete_Many>;
  delete_terminals_item?: Maybe<Delete_One>;
  delete_terminals_items?: Maybe<Delete_Many>;
  delete_views_item?: Maybe<Delete_One>;
  delete_views_items?: Maybe<Delete_Many>;
  delete_visits_item?: Maybe<Delete_One>;
  delete_visits_items?: Maybe<Delete_Many>;
  delete_wechat_users_item?: Maybe<Delete_One>;
  delete_wechat_users_items?: Maybe<Delete_Many>;
  update_boutiques_batch: Array<Boutiques>;
  update_boutiques_item?: Maybe<Boutiques>;
  update_boutiques_items: Array<Boutiques>;
  update_categories_batch: Array<Categories>;
  update_categories_item?: Maybe<Categories>;
  update_categories_items: Array<Categories>;
  update_customers_batch: Array<Customers>;
  update_customers_item?: Maybe<Customers>;
  update_customers_items: Array<Customers>;
  update_orders_batch: Array<Orders>;
  update_orders_item?: Maybe<Orders>;
  update_orders_items: Array<Orders>;
  update_products_batch: Array<Products>;
  update_products_item?: Maybe<Products>;
  update_products_items: Array<Products>;
  update_terminals_batch: Array<Terminals>;
  update_terminals_item?: Maybe<Terminals>;
  update_terminals_items: Array<Terminals>;
  update_views_batch: Array<Views>;
  update_views_item?: Maybe<Views>;
  update_views_items: Array<Views>;
  update_visits_batch: Array<Visits>;
  update_visits_item?: Maybe<Visits>;
  update_visits_items: Array<Visits>;
  update_wechat_users_batch: Array<Wechat_Users>;
  update_wechat_users_item?: Maybe<Wechat_Users>;
  update_wechat_users_items: Array<Wechat_Users>;
};


export type MutationCreate_Boutiques_ItemArgs = {
  data: Create_Boutiques_Input;
};


export type MutationCreate_Boutiques_ItemsArgs = {
  data?: InputMaybe<Array<Create_Boutiques_Input>>;
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Categories_ItemArgs = {
  data: Create_Categories_Input;
};


export type MutationCreate_Categories_ItemsArgs = {
  data?: InputMaybe<Array<Create_Categories_Input>>;
  filter?: InputMaybe<Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Customers_ItemArgs = {
  data: Create_Customers_Input;
};


export type MutationCreate_Customers_ItemsArgs = {
  data?: InputMaybe<Array<Create_Customers_Input>>;
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Orders_ItemArgs = {
  data: Create_Orders_Input;
};


export type MutationCreate_Orders_ItemsArgs = {
  data?: InputMaybe<Array<Create_Orders_Input>>;
  filter?: InputMaybe<Orders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Products_ItemArgs = {
  data: Create_Products_Input;
};


export type MutationCreate_Products_ItemsArgs = {
  data?: InputMaybe<Array<Create_Products_Input>>;
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Terminals_ItemArgs = {
  data: Create_Terminals_Input;
};


export type MutationCreate_Terminals_ItemsArgs = {
  data?: InputMaybe<Array<Create_Terminals_Input>>;
  filter?: InputMaybe<Terminals_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Views_ItemArgs = {
  data: Create_Views_Input;
};


export type MutationCreate_Views_ItemsArgs = {
  data?: InputMaybe<Array<Create_Views_Input>>;
  filter?: InputMaybe<Views_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Visits_ItemArgs = {
  data: Create_Visits_Input;
};


export type MutationCreate_Visits_ItemsArgs = {
  data?: InputMaybe<Array<Create_Visits_Input>>;
  filter?: InputMaybe<Visits_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Wechat_Users_ItemArgs = {
  data: Create_Wechat_Users_Input;
};


export type MutationCreate_Wechat_Users_ItemsArgs = {
  data?: InputMaybe<Array<Create_Wechat_Users_Input>>;
  filter?: InputMaybe<Wechat_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationDelete_Boutiques_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Boutiques_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Customers_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Customers_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Orders_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Orders_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Products_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Products_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Terminals_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Terminals_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Views_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Views_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Visits_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Visits_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Wechat_Users_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Wechat_Users_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationUpdate_Boutiques_BatchArgs = {
  data?: InputMaybe<Array<Update_Boutiques_Input>>;
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Boutiques_ItemArgs = {
  data: Update_Boutiques_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Boutiques_ItemsArgs = {
  data: Update_Boutiques_Input;
  filter?: InputMaybe<Boutiques_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Categories_BatchArgs = {
  data?: InputMaybe<Array<Update_Categories_Input>>;
  filter?: InputMaybe<Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Categories_ItemArgs = {
  data: Update_Categories_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Categories_ItemsArgs = {
  data: Update_Categories_Input;
  filter?: InputMaybe<Categories_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Customers_BatchArgs = {
  data?: InputMaybe<Array<Update_Customers_Input>>;
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Customers_ItemArgs = {
  data: Update_Customers_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Customers_ItemsArgs = {
  data: Update_Customers_Input;
  filter?: InputMaybe<Customers_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Orders_BatchArgs = {
  data?: InputMaybe<Array<Update_Orders_Input>>;
  filter?: InputMaybe<Orders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Orders_ItemArgs = {
  data: Update_Orders_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Orders_ItemsArgs = {
  data: Update_Orders_Input;
  filter?: InputMaybe<Orders_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Products_BatchArgs = {
  data?: InputMaybe<Array<Update_Products_Input>>;
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Products_ItemArgs = {
  data: Update_Products_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Products_ItemsArgs = {
  data: Update_Products_Input;
  filter?: InputMaybe<Products_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Terminals_BatchArgs = {
  data?: InputMaybe<Array<Update_Terminals_Input>>;
  filter?: InputMaybe<Terminals_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Terminals_ItemArgs = {
  data: Update_Terminals_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Terminals_ItemsArgs = {
  data: Update_Terminals_Input;
  filter?: InputMaybe<Terminals_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Views_BatchArgs = {
  data?: InputMaybe<Array<Update_Views_Input>>;
  filter?: InputMaybe<Views_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Views_ItemArgs = {
  data: Update_Views_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Views_ItemsArgs = {
  data: Update_Views_Input;
  filter?: InputMaybe<Views_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Visits_BatchArgs = {
  data?: InputMaybe<Array<Update_Visits_Input>>;
  filter?: InputMaybe<Visits_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Visits_ItemArgs = {
  data: Update_Visits_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Visits_ItemsArgs = {
  data: Update_Visits_Input;
  filter?: InputMaybe<Visits_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Wechat_Users_BatchArgs = {
  data?: InputMaybe<Array<Update_Wechat_Users_Input>>;
  filter?: InputMaybe<Wechat_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Wechat_Users_ItemArgs = {
  data: Update_Wechat_Users_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Wechat_Users_ItemsArgs = {
  data: Update_Wechat_Users_Input;
  filter?: InputMaybe<Wechat_Users_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query = {
  __typename?: 'Query';
  boutiques: Array<Boutiques>;
  boutiques_aggregated: Array<Boutiques_Aggregated>;
  boutiques_by_id?: Maybe<Boutiques>;
  boutiques_by_version?: Maybe<Version_Boutiques>;
  categories: Array<Categories>;
  categories_aggregated: Array<Categories_Aggregated>;
  categories_by_id?: Maybe<Categories>;
  categories_by_version?: Maybe<Version_Categories>;
  customers: Array<Customers>;
  customers_aggregated: Array<Customers_Aggregated>;
  customers_by_id?: Maybe<Customers>;
  customers_by_version?: Maybe<Version_Customers>;
  orders: Array<Orders>;
  orders_aggregated: Array<Orders_Aggregated>;
  orders_by_id?: Maybe<Orders>;
  orders_by_version?: Maybe<Version_Orders>;
  products: Array<Products>;
  products_aggregated: Array<Products_Aggregated>;
  products_by_id?: Maybe<Products>;
  products_by_version?: Maybe<Version_Products>;
  terminals: Array<Terminals>;
  terminals_aggregated: Array<Terminals_Aggregated>;
  terminals_by_id?: Maybe<Terminals>;
  terminals_by_version?: Maybe<Version_Terminals>;
  views: Array<Views>;
  views_aggregated: Array<Views_Aggregated>;
  views_by_id?: Maybe<Views>;
  views_by_version?: Maybe<Version_Views>;
  visits: Array<Visits>;
  visits_aggregated: Array<Visits_Aggregated>;
  visits_by_id?: Maybe<Visits>;
  visits_by_version?: Maybe<Version_Visits>;
  wechat_users: Array<Wechat_Users>;
  wechat_users_aggregated: Array<Wechat_Users_Aggregated>;
  wechat_users_by_id?: Maybe<Wechat_Users>;
  wechat_users_by_version?: Maybe<Version_Wechat_Users>;
};


export type QueryBoutiquesArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryBoutiques_AggregatedArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryBoutiques_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBoutiques_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCategories_AggregatedArgs = {
  filter?: InputMaybe<Categories_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCategories_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategories_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryCustomersArgs = {
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCustomers_AggregatedArgs = {
  filter?: InputMaybe<Customers_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCustomers_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomers_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<Orders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrders_AggregatedArgs = {
  filter?: InputMaybe<Orders_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrders_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrders_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProducts_AggregatedArgs = {
  filter?: InputMaybe<Products_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProducts_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProducts_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryTerminalsArgs = {
  filter?: InputMaybe<Terminals_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTerminals_AggregatedArgs = {
  filter?: InputMaybe<Terminals_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTerminals_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTerminals_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryViewsArgs = {
  filter?: InputMaybe<Views_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryViews_AggregatedArgs = {
  filter?: InputMaybe<Views_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryViews_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryViews_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryVisitsArgs = {
  filter?: InputMaybe<Visits_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVisits_AggregatedArgs = {
  filter?: InputMaybe<Visits_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVisits_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVisits_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryWechat_UsersArgs = {
  filter?: InputMaybe<Wechat_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryWechat_Users_AggregatedArgs = {
  filter?: InputMaybe<Wechat_Users_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryWechat_Users_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWechat_Users_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boutiques_mutated?: Maybe<Boutiques_Mutated>;
  categories_mutated?: Maybe<Categories_Mutated>;
  customers_mutated?: Maybe<Customers_Mutated>;
  directus_access_mutated?: Maybe<Directus_Access_Mutated>;
  directus_activity_mutated?: Maybe<Directus_Activity_Mutated>;
  directus_comments_mutated?: Maybe<Directus_Comments_Mutated>;
  directus_dashboards_mutated?: Maybe<Directus_Dashboards_Mutated>;
  directus_files_mutated?: Maybe<Directus_Files_Mutated>;
  directus_flows_mutated?: Maybe<Directus_Flows_Mutated>;
  directus_folders_mutated?: Maybe<Directus_Folders_Mutated>;
  directus_notifications_mutated?: Maybe<Directus_Notifications_Mutated>;
  directus_operations_mutated?: Maybe<Directus_Operations_Mutated>;
  directus_panels_mutated?: Maybe<Directus_Panels_Mutated>;
  directus_permissions_mutated?: Maybe<Directus_Permissions_Mutated>;
  directus_policies_mutated?: Maybe<Directus_Policies_Mutated>;
  directus_presets_mutated?: Maybe<Directus_Presets_Mutated>;
  directus_revisions_mutated?: Maybe<Directus_Revisions_Mutated>;
  directus_roles_mutated?: Maybe<Directus_Roles_Mutated>;
  directus_settings_mutated?: Maybe<Directus_Settings_Mutated>;
  directus_shares_mutated?: Maybe<Directus_Shares_Mutated>;
  directus_translations_mutated?: Maybe<Directus_Translations_Mutated>;
  directus_users_mutated?: Maybe<Directus_Users_Mutated>;
  directus_versions_mutated?: Maybe<Directus_Versions_Mutated>;
  directus_webhooks_mutated?: Maybe<Directus_Webhooks_Mutated>;
  orders_mutated?: Maybe<Orders_Mutated>;
  products_mutated?: Maybe<Products_Mutated>;
  terminals_mutated?: Maybe<Terminals_Mutated>;
  views_mutated?: Maybe<Views_Mutated>;
  visits_mutated?: Maybe<Visits_Mutated>;
  wechat_users_mutated?: Maybe<Wechat_Users_Mutated>;
};


export type SubscriptionBoutiques_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionCategories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionCustomers_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Access_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Activity_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Comments_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Dashboards_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Files_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Flows_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Folders_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Operations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Panels_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Permissions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Policies_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Presets_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Revisions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Roles_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Settings_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Shares_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Versions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Webhooks_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionOrders_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProducts_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionTerminals_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionViews_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionVisits_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionWechat_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type Big_Int_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _eq?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _gt?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _lt?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _neq?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Boutiques = {
  __typename?: 'boutiques';
  address?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  expire_date?: Maybe<Scalars['Date']['output']>;
  expire_date_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  images?: Maybe<Scalars['JSON']['output']>;
  images_func?: Maybe<Count_Functions>;
  logo?: Maybe<Scalars['String']['output']>;
  main_image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_account_image?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type BoutiquesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BoutiquesUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Boutiques_Aggregated = {
  __typename?: 'boutiques_aggregated';
  avg?: Maybe<Boutiques_Aggregated_Fields>;
  avgDistinct?: Maybe<Boutiques_Aggregated_Fields>;
  count?: Maybe<Boutiques_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Boutiques_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Boutiques_Aggregated_Fields>;
  min?: Maybe<Boutiques_Aggregated_Fields>;
  sum?: Maybe<Boutiques_Aggregated_Fields>;
  sumDistinct?: Maybe<Boutiques_Aggregated_Fields>;
};

export type Boutiques_Aggregated_Count = {
  __typename?: 'boutiques_aggregated_count';
  address?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['Int']['output']>;
  contact?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  expire_date?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Scalars['Int']['output']>;
  logo?: Maybe<Scalars['Int']['output']>;
  main_image?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  official_account_image?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Boutiques_Aggregated_Fields = {
  __typename?: 'boutiques_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

export type Boutiques_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Boutiques_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Boutiques_Filter>>>;
  address?: InputMaybe<String_Filter_Operators>;
  category?: InputMaybe<String_Filter_Operators>;
  city?: InputMaybe<String_Filter_Operators>;
  code?: InputMaybe<String_Filter_Operators>;
  contact?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  expire_date?: InputMaybe<Date_Filter_Operators>;
  expire_date_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  images?: InputMaybe<String_Filter_Operators>;
  images_func?: InputMaybe<Count_Function_Filter_Operators>;
  logo?: InputMaybe<String_Filter_Operators>;
  main_image?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  official_account_image?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  stars?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Boutiques_Mutated = {
  __typename?: 'boutiques_mutated';
  data?: Maybe<Boutiques>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Categories = {
  __typename?: 'categories';
  boutique?: Maybe<Boutiques>;
  boutique_id?: Maybe<Boutiques>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type CategoriesBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriesBoutique_IdArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriesUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Categories_Aggregated = {
  __typename?: 'categories_aggregated';
  avg?: Maybe<Categories_Aggregated_Fields>;
  avgDistinct?: Maybe<Categories_Aggregated_Fields>;
  count?: Maybe<Categories_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Categories_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Categories_Aggregated_Fields>;
  min?: Maybe<Categories_Aggregated_Fields>;
  sum?: Maybe<Categories_Aggregated_Fields>;
  sumDistinct?: Maybe<Categories_Aggregated_Fields>;
};

export type Categories_Aggregated_Count = {
  __typename?: 'categories_aggregated_count';
  boutique_id?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Categories_Aggregated_Fields = {
  __typename?: 'categories_aggregated_fields';
  boutique_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Categories_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Categories_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Categories_Filter>>>;
  boutique?: InputMaybe<Boutiques_Filter>;
  boutique_id?: InputMaybe<Boutiques_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Categories_Mutated = {
  __typename?: 'categories_mutated';
  data?: Maybe<Categories>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Create_Boutiques_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  expire_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  main_image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_account_image?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Categories_Input = {
  boutique?: InputMaybe<Create_Boutiques_Input>;
  boutique_id?: InputMaybe<Create_Boutiques_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Customers_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  boutique?: InputMaybe<Create_Boutiques_Input>;
  contact?: InputMaybe<Scalars['String']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  nick_name?: InputMaybe<Scalars['String']['input']>;
  open_id: Scalars['String']['input'];
  sex?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Access_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']['input']>;
  created_on?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  embed?: InputMaybe<Scalars['String']['input']>;
  filename_disk?: InputMaybe<Scalars['String']['input']>;
  filename_download: Scalars['String']['input'];
  filesize?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  focal_point_x?: InputMaybe<Scalars['Int']['input']>;
  focal_point_y?: InputMaybe<Scalars['Int']['input']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']['input']>;
  storage: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  tus_data?: InputMaybe<Scalars['JSON']['input']>;
  tus_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Permissions_Input = {
  action: Scalars['String']['input'];
  collection: Scalars['String']['input'];
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars['JSON']['input']>;
  validation?: InputMaybe<Scalars['JSON']['input']>;
};

export type Create_Directus_Policies_Input = {
  admin_access: Scalars['Boolean']['input'];
  app_access: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars['Boolean']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  permissions?: InputMaybe<Array<InputMaybe<Create_Directus_Permissions_Input>>>;
  roles?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
};

export type Create_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Create_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Create_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars['String']['input']>;
  auth_data?: InputMaybe<Scalars['JSON']['input']>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  external_identifier?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  last_access?: InputMaybe<Scalars['Date']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  last_page?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['Hash']['input']>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  text_direction?: InputMaybe<Scalars['String']['input']>;
  tfa_secret?: InputMaybe<Scalars['Hash']['input']>;
  theme_dark?: InputMaybe<Scalars['String']['input']>;
  theme_dark_overrides?: InputMaybe<Scalars['JSON']['input']>;
  theme_light?: InputMaybe<Scalars['String']['input']>;
  theme_light_overrides?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['Hash']['input']>;
};

export type Create_Orders_Input = {
  boutique?: InputMaybe<Create_Boutiques_Input>;
  customer?: InputMaybe<Create_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<Create_Products_Input>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_price?: InputMaybe<Scalars['Float']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Products_Input = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  boutique?: InputMaybe<Create_Boutiques_Input>;
  boutique_id?: InputMaybe<Create_Boutiques_Input>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carousel?: InputMaybe<Scalars['String']['input']>;
  carousel_images?: InputMaybe<Scalars['JSON']['input']>;
  category_id?: InputMaybe<Create_Categories_Input>;
  created_at?: InputMaybe<Scalars['Date']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Scalars['JSON']['input']>;
  is_on_sale?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  main_image?: InputMaybe<Scalars['String']['input']>;
  market_price?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  rating_avg?: InputMaybe<Scalars['Float']['input']>;
  seller_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  total_reviews?: InputMaybe<Scalars['Int']['input']>;
  total_sales_volume?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Date']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Terminals_Input = {
  android_id?: InputMaybe<Scalars['String']['input']>;
  authorized_boutique?: InputMaybe<Create_Boutiques_Input>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carousel_interval?: InputMaybe<Scalars['Int']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  device_name?: InputMaybe<Scalars['String']['input']>;
  device_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  model_name?: InputMaybe<Scalars['String']['input']>;
  os_name?: InputMaybe<Scalars['String']['input']>;
  os_version?: InputMaybe<Scalars['String']['input']>;
  purposes?: InputMaybe<Scalars['String']['input']>;
  supported_cpu_architectures?: InputMaybe<Scalars['String']['input']>;
  total_memory?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Views_Input = {
  boutique?: InputMaybe<Create_Boutiques_Input>;
  customer?: InputMaybe<Create_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<Create_Products_Input>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Visits_Input = {
  boutique?: InputMaybe<Create_Boutiques_Input>;
  customer?: InputMaybe<Create_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Wechat_Users_Input = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Date']['input']>;
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  headimgurl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  openid: Scalars['String']['input'];
  privilege?: InputMaybe<Scalars['JSON']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  unionid?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Date']['input']>;
};

export type Customers = {
  __typename?: 'customers';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  boutique?: Maybe<Boutiques>;
  contact?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nick_name?: Maybe<Scalars['String']['output']>;
  open_id: Scalars['String']['output'];
  sex?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type CustomersBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CustomersUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CustomersUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Customers_Aggregated = {
  __typename?: 'customers_aggregated';
  avg?: Maybe<Customers_Aggregated_Fields>;
  avgDistinct?: Maybe<Customers_Aggregated_Fields>;
  count?: Maybe<Customers_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Customers_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Customers_Aggregated_Fields>;
  min?: Maybe<Customers_Aggregated_Fields>;
  sum?: Maybe<Customers_Aggregated_Fields>;
  sumDistinct?: Maybe<Customers_Aggregated_Fields>;
};

export type Customers_Aggregated_Count = {
  __typename?: 'customers_aggregated_count';
  address?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['Int']['output']>;
  boutique?: Maybe<Scalars['Int']['output']>;
  contact?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  full_name?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  nick_name?: Maybe<Scalars['Int']['output']>;
  open_id?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Customers_Aggregated_Fields = {
  __typename?: 'customers_aggregated_fields';
  boutique?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sex?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

export type Customers_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Customers_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Customers_Filter>>>;
  address?: InputMaybe<String_Filter_Operators>;
  avatar?: InputMaybe<String_Filter_Operators>;
  boutique?: InputMaybe<Boutiques_Filter>;
  contact?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  full_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  nick_name?: InputMaybe<String_Filter_Operators>;
  open_id?: InputMaybe<String_Filter_Operators>;
  sex?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Customers_Mutated = {
  __typename?: 'customers_mutated';
  data?: Maybe<Customers>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']['output']>;
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  second?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  weekday?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']['output']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID']['output'];
};

export type Directus_Access = {
  __typename?: 'directus_access';
  id: Scalars['ID']['output'];
  policy?: Maybe<Directus_Policies>;
  role?: Maybe<Directus_Roles>;
  sort?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_AccessPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_AccessRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_AccessUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Access_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  id?: InputMaybe<Id_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  role?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Access_Mutated = {
  __typename?: 'directus_access_mutated';
  data?: Maybe<Directus_Access>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Access_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _none?: InputMaybe<Directus_Access_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _some?: InputMaybe<Directus_Access_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  role?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Activity = {
  __typename?: 'directus_activity';
  action: Scalars['String']['output'];
  collection: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  item: Scalars['String']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  revisions?: Maybe<Array<Maybe<Directus_Revisions>>>;
  revisions_func?: Maybe<Count_Functions>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  user?: Maybe<Directus_Users>;
  user_agent?: Maybe<Scalars['String']['output']>;
};


export type Directus_ActivityRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Activity_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  ip?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  origin?: InputMaybe<String_Filter_Operators>;
  revisions?: InputMaybe<Directus_Revisions_Quantifier_Filter>;
  revisions_func?: InputMaybe<Count_Function_Filter_Operators>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
  user_agent?: InputMaybe<String_Filter_Operators>;
};

export type Directus_Activity_Mutated = {
  __typename?: 'directus_activity_mutated';
  data?: Maybe<Directus_Activity>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Comments = {
  __typename?: 'directus_comments';
  collection: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Directus_CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Comments_Mutated = {
  __typename?: 'directus_comments_mutated';
  data?: Maybe<Directus_Comments>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Dashboards = {
  __typename?: 'directus_dashboards';
  color?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  panels?: Maybe<Array<Maybe<Directus_Panels>>>;
  panels_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_DashboardsPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_DashboardsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Dashboards_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  panels?: InputMaybe<Directus_Panels_Quantifier_Filter>;
  panels_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Dashboards_Mutated = {
  __typename?: 'directus_dashboards_mutated';
  data?: Maybe<Directus_Dashboards>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']['output']>;
  created_on?: Maybe<Scalars['Date']['output']>;
  created_on_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  embed?: Maybe<Scalars['String']['output']>;
  filename_disk?: Maybe<Scalars['String']['output']>;
  filename_download: Scalars['String']['output'];
  filesize?: Maybe<Scalars['GraphQLBigInt']['output']>;
  focal_point_x?: Maybe<Scalars['Int']['output']>;
  focal_point_y?: Maybe<Scalars['Int']['output']>;
  folder?: Maybe<Directus_Folders>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars['Date']['output']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String']['output'];
  tags?: Maybe<Scalars['JSON']['output']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']['output']>;
  tus_data?: Maybe<Scalars['JSON']['output']>;
  tus_data_func?: Maybe<Count_Functions>;
  tus_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars['Date']['output']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']['output']>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  created_on?: InputMaybe<Date_Filter_Operators>;
  created_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Big_Int_Filter_Operators>;
  focal_point_x?: InputMaybe<Number_Filter_Operators>;
  focal_point_y?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  tus_data?: InputMaybe<String_Filter_Operators>;
  tus_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  tus_id?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Files_Mutated = {
  __typename?: 'directus_files_mutated';
  data?: Maybe<Directus_Files>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Flows = {
  __typename?: 'directus_flows';
  accountability?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operation?: Maybe<Directus_Operations>;
  operations?: Maybe<Array<Maybe<Directus_Operations>>>;
  operations_func?: Maybe<Count_Functions>;
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars['String']['output']>;
  trigger?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_FlowsOperationArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_FlowsOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_FlowsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Flows_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  accountability?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  operation?: InputMaybe<Directus_Operations_Filter>;
  operations?: InputMaybe<Directus_Operations_Quantifier_Filter>;
  operations_func?: InputMaybe<Count_Function_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  trigger?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Flows_Mutated = {
  __typename?: 'directus_flows_mutated';
  data?: Maybe<Directus_Flows>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Folders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
};

export type Directus_Folders_Mutated = {
  __typename?: 'directus_folders_mutated';
  data?: Maybe<Directus_Folders>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Notifications = {
  __typename?: 'directus_notifications';
  collection?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  status?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
};


export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Notifications_Mutated = {
  __typename?: 'directus_notifications_mutated';
  data?: Maybe<Directus_Notifications>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Operations = {
  __typename?: 'directus_operations';
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  flow?: Maybe<Directus_Flows>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int']['output'];
  position_y: Scalars['Int']['output'];
  reject?: Maybe<Directus_Operations>;
  resolve?: Maybe<Directus_Operations>;
  type: Scalars['String']['output'];
  user_created?: Maybe<Directus_Users>;
};


export type Directus_OperationsFlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_OperationsRejectArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_OperationsResolveArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_OperationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Operations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Operations_Mutated = {
  __typename?: 'directus_operations_mutated';
  data?: Maybe<Directus_Operations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Operations_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _none?: InputMaybe<Directus_Operations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _some?: InputMaybe<Directus_Operations_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Panels = {
  __typename?: 'directus_panels';
  color?: Maybe<Scalars['String']['output']>;
  dashboard?: Maybe<Directus_Dashboards>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  height: Scalars['Int']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int']['output'];
  position_y: Scalars['Int']['output'];
  show_header: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  user_created?: Maybe<Directus_Users>;
  width: Scalars['Int']['output'];
};


export type Directus_PanelsDashboardArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_PanelsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Panels_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Panels_Mutated = {
  __typename?: 'directus_panels_mutated';
  data?: Maybe<Directus_Panels>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Panels_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _none?: InputMaybe<Directus_Panels_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _some?: InputMaybe<Directus_Panels_Filter>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Permissions = {
  __typename?: 'directus_permissions';
  action: Scalars['String']['output'];
  collection: Scalars['String']['output'];
  fields?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  permissions?: Maybe<Scalars['JSON']['output']>;
  permissions_func?: Maybe<Count_Functions>;
  policy?: Maybe<Directus_Policies>;
  presets?: Maybe<Scalars['JSON']['output']>;
  presets_func?: Maybe<Count_Functions>;
  validation?: Maybe<Scalars['JSON']['output']>;
  validation_func?: Maybe<Count_Functions>;
};


export type Directus_PermissionsPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Permissions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Permissions_Mutated = {
  __typename?: 'directus_permissions_mutated';
  data?: Maybe<Directus_Permissions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Permissions_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _none?: InputMaybe<Directus_Permissions_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _some?: InputMaybe<Directus_Permissions_Filter>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Policies = {
  __typename?: 'directus_policies';
  admin_access: Scalars['Boolean']['output'];
  app_access: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars['Boolean']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ip_access?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Directus_Permissions>>>;
  permissions_func?: Maybe<Count_Functions>;
  roles?: Maybe<Array<Maybe<Directus_Access>>>;
  roles_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Access>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_PoliciesPermissionsArgs = {
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_PoliciesRolesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_PoliciesUsersArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Policies_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  permissions?: InputMaybe<Directus_Permissions_Quantifier_Filter>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  roles?: InputMaybe<Directus_Access_Quantifier_Filter>;
  roles_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Access_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Policies_Mutated = {
  __typename?: 'directus_policies_mutated';
  data?: Maybe<Directus_Policies>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Presets = {
  __typename?: 'directus_presets';
  bookmark?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<Scalars['JSON']['output']>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  layout?: Maybe<Scalars['String']['output']>;
  layout_options?: Maybe<Scalars['JSON']['output']>;
  layout_options_func?: Maybe<Count_Functions>;
  layout_query?: Maybe<Scalars['JSON']['output']>;
  layout_query_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Directus_Roles>;
  search?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Presets_Mutated = {
  __typename?: 'directus_presets_mutated';
  data?: Maybe<Directus_Presets>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Revisions = {
  __typename?: 'directus_revisions';
  activity?: Maybe<Directus_Activity>;
  collection: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  data_func?: Maybe<Count_Functions>;
  delta?: Maybe<Scalars['JSON']['output']>;
  delta_func?: Maybe<Count_Functions>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  parent?: Maybe<Directus_Revisions>;
  version?: Maybe<Directus_Versions>;
};


export type Directus_RevisionsActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RevisionsParentArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RevisionsVersionArgs = {
  filter?: InputMaybe<Directus_Versions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Revisions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  version?: InputMaybe<Directus_Versions_Filter>;
};

export type Directus_Revisions_Mutated = {
  __typename?: 'directus_revisions_mutated';
  data?: Maybe<Directus_Revisions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Revisions_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _none?: InputMaybe<Directus_Revisions_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _some?: InputMaybe<Directus_Revisions_Filter>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  version?: InputMaybe<Directus_Versions_Filter>;
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  children?: Maybe<Array<Maybe<Directus_Roles>>>;
  children_func?: Maybe<Count_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Directus_Roles>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesChildrenArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RolesParentArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RolesPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Roles_Mutated = {
  __typename?: 'directus_roles_mutated';
  data?: Maybe<Directus_Roles>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Roles_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _none?: InputMaybe<Directus_Roles_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _some?: InputMaybe<Directus_Roles_Filter>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  accepted_terms?: Maybe<Scalars['Boolean']['output']>;
  auth_login_attempts?: Maybe<Scalars['Int']['output']>;
  auth_password_policy?: Maybe<Scalars['String']['output']>;
  basemaps?: Maybe<Scalars['JSON']['output']>;
  basemaps_func?: Maybe<Count_Functions>;
  custom_aspect_ratios?: Maybe<Scalars['JSON']['output']>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars['String']['output']>;
  default_appearance?: Maybe<Scalars['String']['output']>;
  default_language?: Maybe<Scalars['String']['output']>;
  default_theme_dark?: Maybe<Scalars['String']['output']>;
  default_theme_light?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mapbox_key?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_allow_deletes_note */
  mcp_allow_deletes: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.mcp_enabled_note */
  mcp_enabled: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.mcp_prompts_collection_note */
  mcp_prompts_collection?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_system_prompt_note */
  mcp_system_prompt?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_system_prompt_enabled_note */
  mcp_system_prompt_enabled?: Maybe<Scalars['Boolean']['output']>;
  module_bar?: Maybe<Scalars['JSON']['output']>;
  module_bar_func?: Maybe<Count_Functions>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars['String']['output']>;
  project_descriptor?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['String']['output']>;
  project_logo?: Maybe<Directus_Files>;
  project_name?: Maybe<Scalars['String']['output']>;
  project_url?: Maybe<Scalars['String']['output']>;
  public_background?: Maybe<Directus_Files>;
  public_favicon?: Maybe<Directus_Files>;
  public_foreground?: Maybe<Directus_Files>;
  public_note?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.public_registration_note */
  public_registration: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.public_registration_email_filter_note */
  public_registration_email_filter?: Maybe<Scalars['JSON']['output']>;
  public_registration_email_filter_func?: Maybe<Count_Functions>;
  public_registration_role?: Maybe<Directus_Roles>;
  /** $t:fields.directus_settings.public_registration_verify_email_note */
  public_registration_verify_email?: Maybe<Scalars['Boolean']['output']>;
  report_bug_url?: Maybe<Scalars['String']['output']>;
  report_error_url?: Maybe<Scalars['String']['output']>;
  report_feature_url?: Maybe<Scalars['String']['output']>;
  storage_asset_presets?: Maybe<Scalars['JSON']['output']>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  storage_asset_transform?: Maybe<Scalars['String']['output']>;
  storage_default_folder?: Maybe<Directus_Folders>;
  theme_dark_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  visual_editor_urls?: Maybe<Scalars['JSON']['output']>;
  visual_editor_urls_func?: Maybe<Count_Functions>;
};


export type Directus_SettingsProject_LogoArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SettingsPublic_BackgroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SettingsPublic_FaviconArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SettingsPublic_ForegroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SettingsPublic_Registration_RoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SettingsStorage_Default_FolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Settings_Mutated = {
  __typename?: 'directus_settings_mutated';
  data?: Maybe<Directus_Settings>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Shares = {
  __typename?: 'directus_shares';
  collection: Scalars['String']['output'];
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Date']['output']>;
  date_end_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Date']['output']>;
  date_start_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** $t:shared_leave_blank_for_passwordless_access */
  password?: Maybe<Scalars['Hash']['output']>;
  role?: Maybe<Directus_Roles>;
  times_used?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Shares_Mutated = {
  __typename?: 'directus_shares_mutated';
  data?: Maybe<Directus_Shares>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Translations = {
  __typename?: 'directus_translations';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  language: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Directus_Translations_Mutated = {
  __typename?: 'directus_translations_mutated';
  data?: Maybe<Directus_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Users = {
  __typename?: 'directus_users';
  appearance?: Maybe<Scalars['String']['output']>;
  auth_data?: Maybe<Scalars['JSON']['output']>;
  auth_data_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email_notifications?: Maybe<Scalars['Boolean']['output']>;
  external_identifier?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  last_access?: Maybe<Scalars['Date']['output']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_name?: Maybe<Scalars['String']['output']>;
  last_page?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['Hash']['output']>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  tags_func?: Maybe<Count_Functions>;
  text_direction?: Maybe<Scalars['String']['output']>;
  tfa_secret?: Maybe<Scalars['Hash']['output']>;
  theme_dark?: Maybe<Scalars['String']['output']>;
  theme_dark_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light?: Maybe<Scalars['String']['output']>;
  theme_light_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['Hash']['output']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_UsersPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  appearance?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  text_direction?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Users_Mutated = {
  __typename?: 'directus_users_mutated';
  data?: Maybe<Directus_Users>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Users_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _none?: InputMaybe<Directus_Users_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _some?: InputMaybe<Directus_Users_Filter>;
  appearance?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  text_direction?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Versions = {
  __typename?: 'directus_versions';
  collection: Scalars['String']['output'];
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  delta?: Maybe<Scalars['JSON']['output']>;
  delta_func?: Maybe<Count_Functions>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Directus_VersionsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_VersionsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Versions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  collection?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  hash?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Versions_Mutated = {
  __typename?: 'directus_versions_mutated';
  data?: Maybe<Directus_Versions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Webhooks = {
  __typename?: 'directus_webhooks';
  actions: Array<Maybe<Scalars['String']['output']>>;
  collections: Array<Maybe<Scalars['String']['output']>>;
  data?: Maybe<Scalars['Boolean']['output']>;
  headers?: Maybe<Scalars['JSON']['output']>;
  headers_func?: Maybe<Count_Functions>;
  id: Scalars['ID']['output'];
  method?: Maybe<Scalars['String']['output']>;
  migrated_flow?: Maybe<Directus_Flows>;
  name: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  was_active_before_deprecation: Scalars['Boolean']['output'];
};


export type Directus_WebhooksMigrated_FlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Webhooks_Mutated = {
  __typename?: 'directus_webhooks_mutated';
  data?: Maybe<Directus_Webhooks>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Id_Filter_Operators = {
  _contains?: InputMaybe<Scalars['ID']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _ends_with?: InputMaybe<Scalars['ID']['input']>;
  _eq?: InputMaybe<Scalars['ID']['input']>;
  _icontains?: InputMaybe<Scalars['ID']['input']>;
  _iends_with?: InputMaybe<Scalars['ID']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  _istarts_with?: InputMaybe<Scalars['ID']['input']>;
  _ncontains?: InputMaybe<Scalars['ID']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nends_with?: InputMaybe<Scalars['ID']['input']>;
  _neq?: InputMaybe<Scalars['ID']['input']>;
  _niends_with?: InputMaybe<Scalars['ID']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  _nistarts_with?: InputMaybe<Scalars['ID']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _nstarts_with?: InputMaybe<Scalars['ID']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _starts_with?: InputMaybe<Scalars['ID']['input']>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Orders = {
  __typename?: 'orders';
  boutique?: Maybe<Boutiques>;
  customer?: Maybe<Customers>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  product?: Maybe<Products>;
  status?: Maybe<Scalars['String']['output']>;
  total_price?: Maybe<Scalars['Float']['output']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type OrdersBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrdersCustomerArgs = {
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrdersProductArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrdersUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrdersUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Orders_Aggregated = {
  __typename?: 'orders_aggregated';
  avg?: Maybe<Orders_Aggregated_Fields>;
  avgDistinct?: Maybe<Orders_Aggregated_Fields>;
  count?: Maybe<Orders_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Orders_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Orders_Aggregated_Fields>;
  min?: Maybe<Orders_Aggregated_Fields>;
  sum?: Maybe<Orders_Aggregated_Fields>;
  sumDistinct?: Maybe<Orders_Aggregated_Fields>;
};

export type Orders_Aggregated_Count = {
  __typename?: 'orders_aggregated_count';
  boutique?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  total_price?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Orders_Aggregated_Fields = {
  __typename?: 'orders_aggregated_fields';
  boutique?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Scalars['Float']['output']>;
  total_price?: Maybe<Scalars['Float']['output']>;
};

export type Orders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Orders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Orders_Filter>>>;
  boutique?: InputMaybe<Boutiques_Filter>;
  customer?: InputMaybe<Customers_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  product?: InputMaybe<Products_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  total_price?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Orders_Mutated = {
  __typename?: 'orders_mutated';
  data?: Maybe<Orders>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Products = {
  __typename?: 'products';
  barcode?: Maybe<Scalars['String']['output']>;
  boutique?: Maybe<Boutiques>;
  boutique_id?: Maybe<Boutiques>;
  brand?: Maybe<Scalars['String']['output']>;
  carousel?: Maybe<Scalars['String']['output']>;
  carousel_images?: Maybe<Scalars['JSON']['output']>;
  carousel_images_func?: Maybe<Count_Functions>;
  category_id?: Maybe<Categories>;
  created_at?: Maybe<Scalars['Date']['output']>;
  created_at_func?: Maybe<Datetime_Functions>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Scalars['JSON']['output']>;
  images_func?: Maybe<Count_Functions>;
  is_on_sale?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  main_image?: Maybe<Scalars['String']['output']>;
  market_price?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating_avg?: Maybe<Scalars['Float']['output']>;
  seller_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  total_reviews?: Maybe<Scalars['Int']['output']>;
  total_sales_volume?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  updated_at_func?: Maybe<Datetime_Functions>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
  video_url?: Maybe<Scalars['String']['output']>;
};


export type ProductsBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsBoutique_IdArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsCategory_IdArgs = {
  filter?: InputMaybe<Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Products_Aggregated = {
  __typename?: 'products_aggregated';
  avg?: Maybe<Products_Aggregated_Fields>;
  avgDistinct?: Maybe<Products_Aggregated_Fields>;
  count?: Maybe<Products_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Products_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Products_Aggregated_Fields>;
  min?: Maybe<Products_Aggregated_Fields>;
  sum?: Maybe<Products_Aggregated_Fields>;
  sumDistinct?: Maybe<Products_Aggregated_Fields>;
};

export type Products_Aggregated_Count = {
  __typename?: 'products_aggregated_count';
  barcode?: Maybe<Scalars['Int']['output']>;
  boutique_id?: Maybe<Scalars['Int']['output']>;
  brand?: Maybe<Scalars['Int']['output']>;
  carousel?: Maybe<Scalars['Int']['output']>;
  carousel_images?: Maybe<Scalars['Int']['output']>;
  category_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Scalars['Int']['output']>;
  is_on_sale?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['Int']['output']>;
  main_image?: Maybe<Scalars['Int']['output']>;
  market_price?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  rating_avg?: Maybe<Scalars['Int']['output']>;
  seller_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  subtitle?: Maybe<Scalars['Int']['output']>;
  total_reviews?: Maybe<Scalars['Int']['output']>;
  total_sales_volume?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
  video_url?: Maybe<Scalars['Int']['output']>;
};

export type Products_Aggregated_Fields = {
  __typename?: 'products_aggregated_fields';
  boutique_id?: Maybe<Scalars['Float']['output']>;
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  market_price?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rating_avg?: Maybe<Scalars['Float']['output']>;
  seller_id?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
  total_reviews?: Maybe<Scalars['Float']['output']>;
  total_sales_volume?: Maybe<Scalars['Float']['output']>;
};

export type Products_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  barcode?: InputMaybe<String_Filter_Operators>;
  boutique?: InputMaybe<Boutiques_Filter>;
  boutique_id?: InputMaybe<Boutiques_Filter>;
  brand?: InputMaybe<String_Filter_Operators>;
  carousel?: InputMaybe<String_Filter_Operators>;
  carousel_images?: InputMaybe<String_Filter_Operators>;
  carousel_images_func?: InputMaybe<Count_Function_Filter_Operators>;
  category_id?: InputMaybe<Categories_Filter>;
  created_at?: InputMaybe<Date_Filter_Operators>;
  created_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  images?: InputMaybe<String_Filter_Operators>;
  images_func?: InputMaybe<Count_Function_Filter_Operators>;
  is_on_sale?: InputMaybe<Boolean_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  main_image?: InputMaybe<String_Filter_Operators>;
  market_price?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  price?: InputMaybe<Number_Filter_Operators>;
  rating_avg?: InputMaybe<Number_Filter_Operators>;
  seller_id?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  stock?: InputMaybe<Number_Filter_Operators>;
  subtitle?: InputMaybe<String_Filter_Operators>;
  total_reviews?: InputMaybe<Number_Filter_Operators>;
  total_sales_volume?: InputMaybe<Number_Filter_Operators>;
  updated_at?: InputMaybe<Date_Filter_Operators>;
  updated_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
  video_url?: InputMaybe<String_Filter_Operators>;
};

export type Products_Mutated = {
  __typename?: 'products_mutated';
  data?: Maybe<Products>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _ends_with?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _icontains?: InputMaybe<Scalars['String']['input']>;
  _iends_with?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _istarts_with?: InputMaybe<Scalars['String']['input']>;
  _ncontains?: InputMaybe<Scalars['String']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nends_with?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _niends_with?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nistarts_with?: InputMaybe<Scalars['String']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _nstarts_with?: InputMaybe<Scalars['String']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Terminals = {
  __typename?: 'terminals';
  android_id?: Maybe<Scalars['String']['output']>;
  authorized_boutique?: Maybe<Boutiques>;
  brand?: Maybe<Scalars['String']['output']>;
  carousel_interval?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  device_name?: Maybe<Scalars['String']['output']>;
  device_type?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  manufacturer?: Maybe<Scalars['String']['output']>;
  model_name?: Maybe<Scalars['String']['output']>;
  os_name?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
  purposes?: Maybe<Scalars['String']['output']>;
  supported_cpu_architectures?: Maybe<Scalars['String']['output']>;
  total_memory?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type TerminalsAuthorized_BoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TerminalsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TerminalsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Terminals_Aggregated = {
  __typename?: 'terminals_aggregated';
  avg?: Maybe<Terminals_Aggregated_Fields>;
  avgDistinct?: Maybe<Terminals_Aggregated_Fields>;
  count?: Maybe<Terminals_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Terminals_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Terminals_Aggregated_Fields>;
  min?: Maybe<Terminals_Aggregated_Fields>;
  sum?: Maybe<Terminals_Aggregated_Fields>;
  sumDistinct?: Maybe<Terminals_Aggregated_Fields>;
};

export type Terminals_Aggregated_Count = {
  __typename?: 'terminals_aggregated_count';
  android_id?: Maybe<Scalars['Int']['output']>;
  authorized_boutique?: Maybe<Scalars['Int']['output']>;
  brand?: Maybe<Scalars['Int']['output']>;
  carousel_interval?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  device_name?: Maybe<Scalars['Int']['output']>;
  device_type?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  manufacturer?: Maybe<Scalars['Int']['output']>;
  model_name?: Maybe<Scalars['Int']['output']>;
  os_name?: Maybe<Scalars['Int']['output']>;
  os_version?: Maybe<Scalars['Int']['output']>;
  purposes?: Maybe<Scalars['Int']['output']>;
  supported_cpu_architectures?: Maybe<Scalars['Int']['output']>;
  total_memory?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Terminals_Aggregated_Fields = {
  __typename?: 'terminals_aggregated_fields';
  authorized_boutique?: Maybe<Scalars['Float']['output']>;
  carousel_interval?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Terminals_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Terminals_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Terminals_Filter>>>;
  android_id?: InputMaybe<String_Filter_Operators>;
  authorized_boutique?: InputMaybe<Boutiques_Filter>;
  brand?: InputMaybe<String_Filter_Operators>;
  carousel_interval?: InputMaybe<Number_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  device_name?: InputMaybe<String_Filter_Operators>;
  device_type?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  manufacturer?: InputMaybe<String_Filter_Operators>;
  model_name?: InputMaybe<String_Filter_Operators>;
  os_name?: InputMaybe<String_Filter_Operators>;
  os_version?: InputMaybe<String_Filter_Operators>;
  purposes?: InputMaybe<String_Filter_Operators>;
  supported_cpu_architectures?: InputMaybe<String_Filter_Operators>;
  total_memory?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Terminals_Mutated = {
  __typename?: 'terminals_mutated';
  data?: Maybe<Terminals>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Update_Boutiques_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  expire_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  main_image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_account_image?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Categories_Input = {
  boutique?: InputMaybe<Update_Boutiques_Input>;
  boutique_id?: InputMaybe<Update_Boutiques_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Customers_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  boutique?: InputMaybe<Update_Boutiques_Input>;
  contact?: InputMaybe<Scalars['String']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  nick_name?: InputMaybe<Scalars['String']['input']>;
  open_id?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Access_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']['input']>;
  created_on?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  embed?: InputMaybe<Scalars['String']['input']>;
  filename_disk?: InputMaybe<Scalars['String']['input']>;
  filename_download?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  focal_point_x?: InputMaybe<Scalars['Int']['input']>;
  focal_point_y?: InputMaybe<Scalars['Int']['input']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']['input']>;
  storage?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  tus_data?: InputMaybe<Scalars['JSON']['input']>;
  tus_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Permissions_Input = {
  action?: InputMaybe<Scalars['String']['input']>;
  collection?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars['JSON']['input']>;
  validation?: InputMaybe<Scalars['JSON']['input']>;
};

export type Update_Directus_Policies_Input = {
  admin_access?: InputMaybe<Scalars['Boolean']['input']>;
  app_access?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa?: InputMaybe<Scalars['Boolean']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Update_Directus_Permissions_Input>>>;
  roles?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
};

export type Update_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Update_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Update_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars['String']['input']>;
  auth_data?: InputMaybe<Scalars['JSON']['input']>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  external_identifier?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  last_access?: InputMaybe<Scalars['Date']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  last_page?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['Hash']['input']>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  text_direction?: InputMaybe<Scalars['String']['input']>;
  tfa_secret?: InputMaybe<Scalars['Hash']['input']>;
  theme_dark?: InputMaybe<Scalars['String']['input']>;
  theme_dark_overrides?: InputMaybe<Scalars['JSON']['input']>;
  theme_light?: InputMaybe<Scalars['String']['input']>;
  theme_light_overrides?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['Hash']['input']>;
};

export type Update_Orders_Input = {
  boutique?: InputMaybe<Update_Boutiques_Input>;
  customer?: InputMaybe<Update_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<Update_Products_Input>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_price?: InputMaybe<Scalars['Float']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Products_Input = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  boutique?: InputMaybe<Update_Boutiques_Input>;
  boutique_id?: InputMaybe<Update_Boutiques_Input>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carousel?: InputMaybe<Scalars['String']['input']>;
  carousel_images?: InputMaybe<Scalars['JSON']['input']>;
  category_id?: InputMaybe<Update_Categories_Input>;
  created_at?: InputMaybe<Scalars['Date']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Scalars['JSON']['input']>;
  is_on_sale?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  main_image?: InputMaybe<Scalars['String']['input']>;
  market_price?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  rating_avg?: InputMaybe<Scalars['Float']['input']>;
  seller_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  total_reviews?: InputMaybe<Scalars['Int']['input']>;
  total_sales_volume?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Date']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Terminals_Input = {
  android_id?: InputMaybe<Scalars['String']['input']>;
  authorized_boutique?: InputMaybe<Update_Boutiques_Input>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carousel_interval?: InputMaybe<Scalars['Int']['input']>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  device_name?: InputMaybe<Scalars['String']['input']>;
  device_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  model_name?: InputMaybe<Scalars['String']['input']>;
  os_name?: InputMaybe<Scalars['String']['input']>;
  os_version?: InputMaybe<Scalars['String']['input']>;
  purposes?: InputMaybe<Scalars['String']['input']>;
  supported_cpu_architectures?: InputMaybe<Scalars['String']['input']>;
  total_memory?: InputMaybe<Scalars['String']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Views_Input = {
  boutique?: InputMaybe<Update_Boutiques_Input>;
  customer?: InputMaybe<Update_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<Update_Products_Input>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Visits_Input = {
  boutique?: InputMaybe<Update_Boutiques_Input>;
  customer?: InputMaybe<Update_Customers_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Wechat_Users_Input = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Date']['input']>;
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  headimgurl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  openid?: InputMaybe<Scalars['String']['input']>;
  privilege?: InputMaybe<Scalars['JSON']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  unionid?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Date']['input']>;
};

export type Version_Boutiques = {
  __typename?: 'version_boutiques';
  address?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  expire_date?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Scalars['JSON']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  main_image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_account_image?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Categories = {
  __typename?: 'version_categories';
  boutique?: Maybe<Scalars['JSON']['output']>;
  boutique_id?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Customers = {
  __typename?: 'version_customers';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  boutique?: Maybe<Scalars['JSON']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  nick_name?: Maybe<Scalars['String']['output']>;
  open_id?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Orders = {
  __typename?: 'version_orders';
  boutique?: Maybe<Scalars['JSON']['output']>;
  customer?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_price?: Maybe<Scalars['Float']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Products = {
  __typename?: 'version_products';
  barcode?: Maybe<Scalars['String']['output']>;
  boutique?: Maybe<Scalars['JSON']['output']>;
  boutique_id?: Maybe<Scalars['JSON']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  carousel?: Maybe<Scalars['String']['output']>;
  carousel_images?: Maybe<Scalars['JSON']['output']>;
  category_id?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Scalars['JSON']['output']>;
  is_on_sale?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  main_image?: Maybe<Scalars['String']['output']>;
  market_price?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rating_avg?: Maybe<Scalars['Float']['output']>;
  seller_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  total_reviews?: Maybe<Scalars['Int']['output']>;
  total_sales_volume?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

export type Version_Terminals = {
  __typename?: 'version_terminals';
  android_id?: Maybe<Scalars['String']['output']>;
  authorized_boutique?: Maybe<Scalars['JSON']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  carousel_interval?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  device_name?: Maybe<Scalars['String']['output']>;
  device_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  model_name?: Maybe<Scalars['String']['output']>;
  os_name?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
  purposes?: Maybe<Scalars['String']['output']>;
  supported_cpu_architectures?: Maybe<Scalars['String']['output']>;
  total_memory?: Maybe<Scalars['String']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Views = {
  __typename?: 'version_views';
  boutique?: Maybe<Scalars['JSON']['output']>;
  customer?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Scalars['JSON']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Visits = {
  __typename?: 'version_visits';
  boutique?: Maybe<Scalars['JSON']['output']>;
  customer?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  user_created?: Maybe<Scalars['JSON']['output']>;
  user_updated?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Wechat_Users = {
  __typename?: 'version_wechat_users';
  access_token?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  expires_at?: Maybe<Scalars['Date']['output']>;
  headimgurl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  openid?: Maybe<Scalars['String']['output']>;
  privilege?: Maybe<Scalars['JSON']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  unionid?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type Views = {
  __typename?: 'views';
  boutique?: Maybe<Boutiques>;
  customer?: Maybe<Customers>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  product?: Maybe<Products>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type ViewsBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ViewsCustomerArgs = {
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ViewsProductArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ViewsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ViewsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Views_Aggregated = {
  __typename?: 'views_aggregated';
  avg?: Maybe<Views_Aggregated_Fields>;
  avgDistinct?: Maybe<Views_Aggregated_Fields>;
  count?: Maybe<Views_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Views_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Views_Aggregated_Fields>;
  min?: Maybe<Views_Aggregated_Fields>;
  sum?: Maybe<Views_Aggregated_Fields>;
  sumDistinct?: Maybe<Views_Aggregated_Fields>;
};

export type Views_Aggregated_Count = {
  __typename?: 'views_aggregated_count';
  boutique?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Views_Aggregated_Fields = {
  __typename?: 'views_aggregated_fields';
  boutique?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Scalars['Float']['output']>;
};

export type Views_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Views_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Views_Filter>>>;
  boutique?: InputMaybe<Boutiques_Filter>;
  customer?: InputMaybe<Customers_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  product?: InputMaybe<Products_Filter>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Views_Mutated = {
  __typename?: 'views_mutated';
  data?: Maybe<Views>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Visits = {
  __typename?: 'visits';
  boutique?: Maybe<Boutiques>;
  customer?: Maybe<Customers>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type VisitsBoutiqueArgs = {
  filter?: InputMaybe<Boutiques_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VisitsCustomerArgs = {
  filter?: InputMaybe<Customers_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VisitsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VisitsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Visits_Aggregated = {
  __typename?: 'visits_aggregated';
  avg?: Maybe<Visits_Aggregated_Fields>;
  avgDistinct?: Maybe<Visits_Aggregated_Fields>;
  count?: Maybe<Visits_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Visits_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Visits_Aggregated_Fields>;
  min?: Maybe<Visits_Aggregated_Fields>;
  sum?: Maybe<Visits_Aggregated_Fields>;
  sumDistinct?: Maybe<Visits_Aggregated_Fields>;
};

export type Visits_Aggregated_Count = {
  __typename?: 'visits_aggregated_count';
  boutique?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
};

export type Visits_Aggregated_Fields = {
  __typename?: 'visits_aggregated_fields';
  boutique?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Visits_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Visits_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Visits_Filter>>>;
  boutique?: InputMaybe<Boutiques_Filter>;
  customer?: InputMaybe<Customers_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Visits_Mutated = {
  __typename?: 'visits_mutated';
  data?: Maybe<Visits>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Wechat_Users = {
  __typename?: 'wechat_users';
  access_token?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  created_at_func?: Maybe<Datetime_Functions>;
  expires_at?: Maybe<Scalars['Date']['output']>;
  expires_at_func?: Maybe<Datetime_Functions>;
  headimgurl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  openid: Scalars['String']['output'];
  privilege?: Maybe<Scalars['JSON']['output']>;
  privilege_func?: Maybe<Count_Functions>;
  province?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  unionid?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  updated_at_func?: Maybe<Datetime_Functions>;
};

export type Wechat_Users_Aggregated = {
  __typename?: 'wechat_users_aggregated';
  avg?: Maybe<Wechat_Users_Aggregated_Fields>;
  avgDistinct?: Maybe<Wechat_Users_Aggregated_Fields>;
  count?: Maybe<Wechat_Users_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Wechat_Users_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Wechat_Users_Aggregated_Fields>;
  min?: Maybe<Wechat_Users_Aggregated_Fields>;
  sum?: Maybe<Wechat_Users_Aggregated_Fields>;
  sumDistinct?: Maybe<Wechat_Users_Aggregated_Fields>;
};

export type Wechat_Users_Aggregated_Count = {
  __typename?: 'wechat_users_aggregated_count';
  access_token?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['Int']['output']>;
  country?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  expires_at?: Maybe<Scalars['Int']['output']>;
  headimgurl?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  is_active?: Maybe<Scalars['Int']['output']>;
  language?: Maybe<Scalars['Int']['output']>;
  nickname?: Maybe<Scalars['Int']['output']>;
  openid?: Maybe<Scalars['Int']['output']>;
  privilege?: Maybe<Scalars['Int']['output']>;
  province?: Maybe<Scalars['Int']['output']>;
  refresh_token?: Maybe<Scalars['Int']['output']>;
  scope?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  unionid?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

export type Wechat_Users_Aggregated_Fields = {
  __typename?: 'wechat_users_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sex?: Maybe<Scalars['Float']['output']>;
};

export type Wechat_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Wechat_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Wechat_Users_Filter>>>;
  access_token?: InputMaybe<String_Filter_Operators>;
  city?: InputMaybe<String_Filter_Operators>;
  country?: InputMaybe<String_Filter_Operators>;
  created_at?: InputMaybe<Date_Filter_Operators>;
  created_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  expires_at?: InputMaybe<Date_Filter_Operators>;
  expires_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  headimgurl?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  is_active?: InputMaybe<Boolean_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  nickname?: InputMaybe<String_Filter_Operators>;
  openid?: InputMaybe<String_Filter_Operators>;
  privilege?: InputMaybe<String_Filter_Operators>;
  privilege_func?: InputMaybe<Count_Function_Filter_Operators>;
  province?: InputMaybe<String_Filter_Operators>;
  refresh_token?: InputMaybe<String_Filter_Operators>;
  scope?: InputMaybe<String_Filter_Operators>;
  sex?: InputMaybe<Number_Filter_Operators>;
  unionid?: InputMaybe<String_Filter_Operators>;
  updated_at?: InputMaybe<Date_Filter_Operators>;
  updated_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
};

export type Wechat_Users_Mutated = {
  __typename?: 'wechat_users_mutated';
  data?: Maybe<Wechat_Users>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type LoginUserQueryVariables = Exact<{
  openid: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', customers_by_id?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null }> };

export type GetBoutiquesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetBoutiquesQuery = { __typename?: 'Query', boutiques: Array<{ __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, code?: string | null, category?: string | null, contact?: string | null, expire_date?: any | null, main_image?: string | null, logo?: string | null, official_account_image?: string | null, images?: any | null, stars?: number | null, status?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetAllBoutiquesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBoutiquesQuery = { __typename?: 'Query', boutiques: Array<{ __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, code?: string | null, category?: string | null, contact?: string | null, expire_date?: any | null, main_image?: string | null, logo?: string | null, official_account_image?: string | null, images?: any | null, stars?: number | null, status?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetBoutiqueByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBoutiqueByIdQuery = { __typename?: 'Query', boutiques_by_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, code?: string | null, category?: string | null, contact?: string | null, expire_date?: any | null, main_image?: string | null, logo?: string | null, official_account_image?: string | null, images?: any | null, stars?: number | null, status?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null } | null };

export type CreateBoutiqueMutationVariables = Exact<{
  data: Create_Boutiques_Input;
}>;


export type CreateBoutiqueMutation = { __typename?: 'Mutation', create_boutiques_item?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, code?: string | null, category?: string | null, contact?: string | null, expire_date?: any | null, main_image?: string | null, logo?: string | null, official_account_image?: string | null, images?: any | null, stars?: number | null, status?: string | null, sort?: number | null, date_created?: any | null } | null };

export type UpdateBoutiqueMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Boutiques_Input;
}>;


export type UpdateBoutiqueMutation = { __typename?: 'Mutation', update_boutiques_item?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, code?: string | null, category?: string | null, contact?: string | null, expire_date?: any | null, main_image?: string | null, logo?: string | null, official_account_image?: string | null, images?: any | null, stars?: number | null, status?: string | null, sort?: number | null, date_updated?: any | null } | null };

export type DeleteBoutiqueMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBoutiqueMutation = { __typename?: 'Mutation', delete_boutiques_item?: { __typename?: 'delete_one', id: string } | null };

export type GetCategoriesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'categories', id: string, name: string, description?: string | null, date_created?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'categories', id: string, name: string, description?: string | null, date_created?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', categories_by_id?: { __typename?: 'categories', id: string, name: string, description?: string | null, date_created?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  data: Create_Categories_Input;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', create_categories_item?: { __typename?: 'categories', id: string, name: string, description?: string | null, date_created?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Categories_Input;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', update_categories_item?: { __typename?: 'categories', id: string, name: string, description?: string | null, date_created?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', delete_categories_item?: { __typename?: 'delete_one', id: string } | null };

export type GetCustomersQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
}>;


export type GetCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string, nick_name?: string | null, full_name?: string | null, contact?: string | null, address?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null, user_updated?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null }> };

export type GetAllCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string, nick_name?: string | null, full_name?: string | null, contact?: string | null, address?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null, user_updated?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetCustomerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCustomerByIdQuery = { __typename?: 'Query', customers_by_id?: { __typename?: 'customers', id: string, nick_name?: string | null, full_name?: string | null, contact?: string | null, address?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null, user_updated?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  data: Create_Customers_Input;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', create_customers_item?: { __typename?: 'customers', id: string, nick_name?: string | null, full_name?: string | null, contact?: string | null, address?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null } | null };

export type UpdateCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Customers_Input;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', update_customers_item?: { __typename?: 'customers', id: string, nick_name?: string | null, full_name?: string | null, contact?: string | null, address?: string | null, open_id: string, avatar?: string | null, sex?: number | null, status?: string | null, type?: string | null, sort?: number | null, date_created?: any | null, date_updated?: any | null } | null };

export type DeleteCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCustomerMutation = { __typename?: 'Mutation', delete_customers_item?: { __typename?: 'delete_one', id: string } | null };

export type GetDashboardDataQueryVariables = Exact<{
  today?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetDashboardDataQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string }>, products: Array<{ __typename?: 'products', id: string }>, orders: Array<{ __typename?: 'orders', id: string }>, categories: Array<{ __typename?: 'categories', id: string }>, boutiques: Array<{ __typename?: 'boutiques', id: string }>, terminals: Array<{ __typename?: 'terminals', id: string }>, views: Array<{ __typename?: 'views', id: string }>, visits: Array<{ __typename?: 'visits', id: string }>, customers_aggregated: Array<{ __typename?: 'customers_aggregated', countAll?: number | null }>, products_aggregated: Array<{ __typename?: 'products_aggregated', countAll?: number | null }>, orders_aggregated: Array<{ __typename?: 'orders_aggregated', countAll?: number | null }>, categories_aggregated: Array<{ __typename?: 'categories_aggregated', countAll?: number | null }>, boutiques_aggregated: Array<{ __typename?: 'boutiques_aggregated', countAll?: number | null }>, terminals_aggregated: Array<{ __typename?: 'terminals_aggregated', countAll?: number | null }>, views_aggregated: Array<{ __typename?: 'views_aggregated', countAll?: number | null }>, visits_aggregated: Array<{ __typename?: 'visits_aggregated', countAll?: number | null }>, today_orders: Array<{ __typename?: 'orders', id: string, status?: string | null }> };

export type GetAllDashboardDataQueryVariables = Exact<{
  today?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllDashboardDataQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'customers', id: string }>, products: Array<{ __typename?: 'products', id: string }>, orders: Array<{ __typename?: 'orders', id: string }>, categories: Array<{ __typename?: 'categories', id: string }>, boutiques: Array<{ __typename?: 'boutiques', id: string }>, customers_aggregated: Array<{ __typename?: 'customers_aggregated', countAll?: number | null }>, products_aggregated: Array<{ __typename?: 'products_aggregated', countAll?: number | null }>, orders_aggregated: Array<{ __typename?: 'orders_aggregated', countAll?: number | null }>, categories_aggregated: Array<{ __typename?: 'categories_aggregated', countAll?: number | null }>, boutiques_aggregated: Array<{ __typename?: 'boutiques_aggregated', countAll?: number | null }>, today_orders: Array<{ __typename?: 'orders', id: string, status?: string | null }> };

export type GetRecentOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetRecentOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null }> };

export type GetAllRecentOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllRecentOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null }> };

export type GetUserOrdersQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetOrdersQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', orders_by_id?: { __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type CreateOrderMutationVariables = Exact<{
  data: Create_Orders_Input;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', create_orders_item?: { __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Orders_Input;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', update_orders_item?: { __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null };

export type DeleteOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', delete_orders_item?: { __typename?: 'delete_one', id: string } | null };

export type UpdateOrderStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', update_orders_item?: { __typename?: 'orders', id: string, status?: string | null, date_updated?: any | null } | null };

export type OrdersRealtimeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OrdersRealtimeSubscription = { __typename?: 'Subscription', orders_mutated?: { __typename?: 'orders_mutated', key: string, event?: EventEnum | null, data?: { __typename?: 'orders', id: string, total_price?: number | null, status?: string | null, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null } | null } | null };

export type GetProductsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'products', id: string, name: string, subtitle?: string | null, description?: string | null, price: number, market_price?: number | null, stock?: number | null, barcode?: string | null, location?: string | null, brand?: string | null, seller_id?: number | null, main_image?: string | null, images?: any | null, carousel_images?: any | null, video_url?: string | null, is_on_sale?: boolean | null, carousel?: string | null, status?: string | null, total_sales_volume?: number | null, rating_avg?: number | null, total_reviews?: number | null, created_at?: any | null, date_created?: any | null, updated_at?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, category_id?: { __typename?: 'categories', id: string, name: string } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'products', id: string, name: string, subtitle?: string | null, description?: string | null, price: number, market_price?: number | null, stock?: number | null, barcode?: string | null, location?: string | null, brand?: string | null, seller_id?: number | null, main_image?: string | null, images?: any | null, carousel_images?: any | null, video_url?: string | null, is_on_sale?: boolean | null, carousel?: string | null, status?: string | null, total_sales_volume?: number | null, rating_avg?: number | null, total_reviews?: number | null, created_at?: any | null, date_created?: any | null, updated_at?: any | null, date_updated?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, category_id?: { __typename?: 'categories', id: string, name: string } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', products_by_id?: { __typename?: 'products', id: string, name: string, subtitle?: string | null, description?: string | null, price: number, market_price?: number | null, stock?: number | null, barcode?: string | null, location?: string | null, brand?: string | null, seller_id?: number | null, main_image?: string | null, images?: any | null, carousel_images?: any | null, video_url?: string | null, is_on_sale?: boolean | null, carousel?: string | null, status?: string | null, total_sales_volume?: number | null, rating_avg?: number | null, total_reviews?: number | null, created_at?: any | null, updated_at?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, category_id?: { __typename?: 'categories', id: string, name: string } | null } | null };

export type CreateProductMutationVariables = Exact<{
  data: Create_Products_Input;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', create_products_item?: { __typename?: 'products', id: string, name: string, subtitle?: string | null, description?: string | null, price: number, market_price?: number | null, stock?: number | null, barcode?: string | null, location?: string | null, brand?: string | null, seller_id?: number | null, main_image?: string | null, images?: any | null, carousel_images?: any | null, video_url?: string | null, is_on_sale?: boolean | null, carousel?: string | null, status?: string | null, total_sales_volume?: number | null, rating_avg?: number | null, total_reviews?: number | null, created_at?: any | null, updated_at?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, category_id?: { __typename?: 'categories', id: string, name: string } | null } | null };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Products_Input;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', update_products_item?: { __typename?: 'products', id: string, name: string, subtitle?: string | null, description?: string | null, price: number, market_price?: number | null, stock?: number | null, barcode?: string | null, location?: string | null, brand?: string | null, seller_id?: number | null, main_image?: string | null, images?: any | null, carousel_images?: any | null, video_url?: string | null, is_on_sale?: boolean | null, carousel?: string | null, status?: string | null, total_sales_volume?: number | null, rating_avg?: number | null, total_reviews?: number | null, created_at?: any | null, updated_at?: any | null, boutique_id?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, category_id?: { __typename?: 'categories', id: string, name: string } | null } | null };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', delete_products_item?: { __typename?: 'delete_one', id: string } | null };

export type GetTerminalsQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
}>;


export type GetTerminalsQuery = { __typename?: 'Query', terminals: Array<{ __typename?: 'terminals', id: string, android_id?: string | null, brand?: string | null, device_name?: string | null, device_type?: string | null, manufacturer?: string | null, model_name?: string | null, os_name?: string | null, os_version?: string | null, purposes?: string | null, supported_cpu_architectures?: string | null, total_memory?: string | null, date_created?: any | null, date_updated?: any | null, authorized_boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetAllTerminalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTerminalsQuery = { __typename?: 'Query', terminals: Array<{ __typename?: 'terminals', id: string, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null }> };

export type GetTerminalByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTerminalByIdQuery = { __typename?: 'Query', terminals_by_id?: { __typename?: 'terminals', id: string, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null } | null };

export type CreateTerminalMutationVariables = Exact<{
  data: Create_Terminals_Input;
}>;


export type CreateTerminalMutation = { __typename?: 'Mutation', create_terminals_item?: { __typename?: 'terminals', id: string, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null } | null };

export type UpdateTerminalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Terminals_Input;
}>;


export type UpdateTerminalMutation = { __typename?: 'Mutation', update_terminals_item?: { __typename?: 'terminals', id: string, date_created?: any | null, date_updated?: any | null, user_created?: { __typename?: 'directus_users', id: string, first_name?: string | null, last_name?: string | null, email?: string | null } | null } | null };

export type DeleteTerminalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTerminalMutation = { __typename?: 'Mutation', delete_terminals_item?: { __typename?: 'delete_one', id: string } | null };

export type DeleteTerminalsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteTerminalsMutation = { __typename?: 'Mutation', delete_terminals_items?: { __typename?: 'delete_many', ids: Array<string | null> } | null };

export type GetViewsQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
}>;


export type GetViewsQuery = { __typename?: 'Query', views: Array<{ __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, product?: { __typename?: 'products', id: string, name: string, main_image?: string | null, price: number, market_price?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null }> };

export type GetAllViewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllViewsQuery = { __typename?: 'Query', views: Array<{ __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, product?: { __typename?: 'products', id: string, name: string, main_image?: string | null, price: number, market_price?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null }> };

export type GetViewsByCustomerQueryVariables = Exact<{
  customerId: Scalars['GraphQLStringOrFloat']['input'];
}>;


export type GetViewsByCustomerQuery = { __typename?: 'Query', views: Array<{ __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string } | null, product?: { __typename?: 'products', id: string, name: string, main_image?: string | null, price: number, market_price?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null } | null }> };

export type GetViewsByProductQueryVariables = Exact<{
  productId: Scalars['GraphQLStringOrFloat']['input'];
}>;


export type GetViewsByProductQuery = { __typename?: 'Query', views: Array<{ __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string } | null, product?: { __typename?: 'products', id: string, name: string } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null }> };

export type GetViewsByBoutiqueQueryVariables = Exact<{
  boutiqueId: Scalars['GraphQLStringOrFloat']['input'];
}>;


export type GetViewsByBoutiqueQuery = { __typename?: 'Query', views: Array<{ __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string } | null, product?: { __typename?: 'products', id: string, name: string, main_image?: string | null, price: number } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null }> };

export type CreateViewMutationVariables = Exact<{
  data: Create_Views_Input;
}>;


export type CreateViewMutation = { __typename?: 'Mutation', create_views_item?: { __typename?: 'views', id: string, date_created?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, product?: { __typename?: 'products', id: string, name: string } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null } | null };

export type UpdateViewMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Views_Input;
}>;


export type UpdateViewMutation = { __typename?: 'Mutation', update_views_item?: { __typename?: 'views', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, product?: { __typename?: 'products', id: string, name: string } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null } | null };

export type DeleteViewMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteViewMutation = { __typename?: 'Mutation', delete_views_item?: { __typename?: 'delete_one', id: string } | null };

export type DeleteViewsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteViewsMutation = { __typename?: 'Mutation', delete_views_items?: { __typename?: 'delete_many', ids: Array<string | null> } | null };

export type GetVisitsQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
}>;


export type GetVisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'visits', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, category?: string | null } | null }> };

export type GetAllVisitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'visits', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null, sex?: number | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, category?: string | null } | null }> };

export type GetVisitsByCustomerQueryVariables = Exact<{
  customerId: Scalars['GraphQLStringOrFloat']['input'];
}>;


export type GetVisitsByCustomerQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'visits', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null, address?: string | null, city?: string | null, category?: string | null } | null }> };

export type GetVisitsByBoutiqueQueryVariables = Exact<{
  boutiqueId: Scalars['GraphQLStringOrFloat']['input'];
}>;


export type GetVisitsByBoutiqueQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'visits', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null, open_id: string, avatar?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null }> };

export type GetVisitStatsQueryVariables = Exact<{
  boutiqueId?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVisitStatsQuery = { __typename?: 'Query', visits_aggregated: Array<{ __typename?: 'visits_aggregated', group?: any | null, countAll?: number | null }> };

export type CreateVisitMutationVariables = Exact<{
  data: Create_Visits_Input;
}>;


export type CreateVisitMutation = { __typename?: 'Mutation', create_visits_item?: { __typename?: 'visits', id: string, date_created?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null } | null };

export type UpdateVisitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Visits_Input;
}>;


export type UpdateVisitMutation = { __typename?: 'Mutation', update_visits_item?: { __typename?: 'visits', id: string, date_created?: any | null, date_updated?: any | null, customer?: { __typename?: 'customers', id: string, nick_name?: string | null } | null, boutique?: { __typename?: 'boutiques', id: string, name?: string | null } | null } | null };

export type DeleteVisitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVisitMutation = { __typename?: 'Mutation', delete_visits_item?: { __typename?: 'delete_one', id: string } | null };

export type DeleteVisitsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteVisitsMutation = { __typename?: 'Mutation', delete_visits_items?: { __typename?: 'delete_many', ids: Array<string | null> } | null };


export const LoginUserDocument = gql`
    query LoginUser($openid: String!) {
  customers(filter: {open_id: {_eq: $openid}}) {
    id
    nick_name
    open_id
    avatar
    sex
    status
    type
  }
}
    `;

/**
 * __useLoginUserQuery__
 *
 * To run a query within a React component, call `useLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginUserQuery({
 *   variables: {
 *      openid: // value for 'openid'
 *   },
 * });
 */
export function useLoginUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LoginUserQuery, LoginUserQueryVariables> & ({ variables: LoginUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
      }
export function useLoginUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
        }
export function useLoginUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
        }
export type LoginUserQueryHookResult = ReturnType<typeof useLoginUserQuery>;
export type LoginUserLazyQueryHookResult = ReturnType<typeof useLoginUserLazyQuery>;
export type LoginUserSuspenseQueryHookResult = ReturnType<typeof useLoginUserSuspenseQuery>;
export type LoginUserQueryResult = ApolloReactCommon.QueryResult<LoginUserQuery, LoginUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  customers_by_id(id: $id) {
    id
    nick_name
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  customers {
    id
    nick_name
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = ApolloReactCommon.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetBoutiquesDocument = gql`
    query GetBoutiques($userId: ID) {
  boutiques(filter: {user_created: {id: {_eq: $userId}}}) {
    id
    name
    address
    city
    code
    category
    contact
    expire_date
    main_image
    logo
    official_account_image
    images
    stars
    status
    sort
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetBoutiquesQuery__
 *
 * To run a query within a React component, call `useGetBoutiquesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoutiquesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoutiquesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBoutiquesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBoutiquesQuery, GetBoutiquesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBoutiquesQuery, GetBoutiquesQueryVariables>(GetBoutiquesDocument, options);
      }
export function useGetBoutiquesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBoutiquesQuery, GetBoutiquesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBoutiquesQuery, GetBoutiquesQueryVariables>(GetBoutiquesDocument, options);
        }
export function useGetBoutiquesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBoutiquesQuery, GetBoutiquesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBoutiquesQuery, GetBoutiquesQueryVariables>(GetBoutiquesDocument, options);
        }
export type GetBoutiquesQueryHookResult = ReturnType<typeof useGetBoutiquesQuery>;
export type GetBoutiquesLazyQueryHookResult = ReturnType<typeof useGetBoutiquesLazyQuery>;
export type GetBoutiquesSuspenseQueryHookResult = ReturnType<typeof useGetBoutiquesSuspenseQuery>;
export type GetBoutiquesQueryResult = ApolloReactCommon.QueryResult<GetBoutiquesQuery, GetBoutiquesQueryVariables>;
export const GetAllBoutiquesDocument = gql`
    query GetAllBoutiques {
  boutiques {
    id
    name
    address
    city
    code
    category
    contact
    expire_date
    main_image
    logo
    official_account_image
    images
    stars
    status
    sort
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetAllBoutiquesQuery__
 *
 * To run a query within a React component, call `useGetAllBoutiquesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBoutiquesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBoutiquesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBoutiquesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>(GetAllBoutiquesDocument, options);
      }
export function useGetAllBoutiquesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>(GetAllBoutiquesDocument, options);
        }
export function useGetAllBoutiquesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>(GetAllBoutiquesDocument, options);
        }
export type GetAllBoutiquesQueryHookResult = ReturnType<typeof useGetAllBoutiquesQuery>;
export type GetAllBoutiquesLazyQueryHookResult = ReturnType<typeof useGetAllBoutiquesLazyQuery>;
export type GetAllBoutiquesSuspenseQueryHookResult = ReturnType<typeof useGetAllBoutiquesSuspenseQuery>;
export type GetAllBoutiquesQueryResult = ApolloReactCommon.QueryResult<GetAllBoutiquesQuery, GetAllBoutiquesQueryVariables>;
export const GetBoutiqueByIdDocument = gql`
    query GetBoutiqueById($id: ID!) {
  boutiques_by_id(id: $id) {
    id
    name
    address
    city
    code
    category
    contact
    expire_date
    main_image
    logo
    official_account_image
    images
    stars
    status
    sort
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetBoutiqueByIdQuery__
 *
 * To run a query within a React component, call `useGetBoutiqueByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoutiqueByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoutiqueByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoutiqueByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables> & ({ variables: GetBoutiqueByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>(GetBoutiqueByIdDocument, options);
      }
export function useGetBoutiqueByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>(GetBoutiqueByIdDocument, options);
        }
export function useGetBoutiqueByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>(GetBoutiqueByIdDocument, options);
        }
export type GetBoutiqueByIdQueryHookResult = ReturnType<typeof useGetBoutiqueByIdQuery>;
export type GetBoutiqueByIdLazyQueryHookResult = ReturnType<typeof useGetBoutiqueByIdLazyQuery>;
export type GetBoutiqueByIdSuspenseQueryHookResult = ReturnType<typeof useGetBoutiqueByIdSuspenseQuery>;
export type GetBoutiqueByIdQueryResult = ApolloReactCommon.QueryResult<GetBoutiqueByIdQuery, GetBoutiqueByIdQueryVariables>;
export const CreateBoutiqueDocument = gql`
    mutation CreateBoutique($data: create_boutiques_input!) {
  create_boutiques_item(data: $data) {
    id
    name
    address
    city
    code
    category
    contact
    expire_date
    main_image
    logo
    official_account_image
    images
    stars
    status
    sort
    date_created
  }
}
    `;
export type CreateBoutiqueMutationFn = ApolloReactCommon.MutationFunction<CreateBoutiqueMutation, CreateBoutiqueMutationVariables>;

/**
 * __useCreateBoutiqueMutation__
 *
 * To run a mutation, you first call `useCreateBoutiqueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoutiqueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoutiqueMutation, { data, loading, error }] = useCreateBoutiqueMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBoutiqueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBoutiqueMutation, CreateBoutiqueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateBoutiqueMutation, CreateBoutiqueMutationVariables>(CreateBoutiqueDocument, options);
      }
export type CreateBoutiqueMutationHookResult = ReturnType<typeof useCreateBoutiqueMutation>;
export type CreateBoutiqueMutationResult = ApolloReactCommon.MutationResult<CreateBoutiqueMutation>;
export type CreateBoutiqueMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateBoutiqueMutation, CreateBoutiqueMutationVariables>;
export const UpdateBoutiqueDocument = gql`
    mutation UpdateBoutique($id: ID!, $data: update_boutiques_input!) {
  update_boutiques_item(id: $id, data: $data) {
    id
    name
    address
    city
    code
    category
    contact
    expire_date
    main_image
    logo
    official_account_image
    images
    stars
    status
    sort
    date_updated
  }
}
    `;
export type UpdateBoutiqueMutationFn = ApolloReactCommon.MutationFunction<UpdateBoutiqueMutation, UpdateBoutiqueMutationVariables>;

/**
 * __useUpdateBoutiqueMutation__
 *
 * To run a mutation, you first call `useUpdateBoutiqueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoutiqueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoutiqueMutation, { data, loading, error }] = useUpdateBoutiqueMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBoutiqueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBoutiqueMutation, UpdateBoutiqueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBoutiqueMutation, UpdateBoutiqueMutationVariables>(UpdateBoutiqueDocument, options);
      }
export type UpdateBoutiqueMutationHookResult = ReturnType<typeof useUpdateBoutiqueMutation>;
export type UpdateBoutiqueMutationResult = ApolloReactCommon.MutationResult<UpdateBoutiqueMutation>;
export type UpdateBoutiqueMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBoutiqueMutation, UpdateBoutiqueMutationVariables>;
export const DeleteBoutiqueDocument = gql`
    mutation DeleteBoutique($id: ID!) {
  delete_boutiques_item(id: $id) {
    id
  }
}
    `;
export type DeleteBoutiqueMutationFn = ApolloReactCommon.MutationFunction<DeleteBoutiqueMutation, DeleteBoutiqueMutationVariables>;

/**
 * __useDeleteBoutiqueMutation__
 *
 * To run a mutation, you first call `useDeleteBoutiqueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoutiqueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoutiqueMutation, { data, loading, error }] = useDeleteBoutiqueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoutiqueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteBoutiqueMutation, DeleteBoutiqueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteBoutiqueMutation, DeleteBoutiqueMutationVariables>(DeleteBoutiqueDocument, options);
      }
export type DeleteBoutiqueMutationHookResult = ReturnType<typeof useDeleteBoutiqueMutation>;
export type DeleteBoutiqueMutationResult = ApolloReactCommon.MutationResult<DeleteBoutiqueMutation>;
export type DeleteBoutiqueMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteBoutiqueMutation, DeleteBoutiqueMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($userId: ID) {
  categories(filter: {user_created: {id: {_eq: $userId}}}) {
    id
    name
    description
    boutique_id {
      id
      name
      address
    }
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  categories {
    id
    name
    description
    boutique_id {
      id
      name
      address
    }
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = ApolloReactCommon.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query GetCategoryById($id: ID!) {
  categories_by_id(id: $id) {
    id
    name
    description
    boutique_id {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables> & ({ variables: GetCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export function useGetCategoryByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryByIdSuspenseQuery>;
export type GetCategoryByIdQueryResult = ApolloReactCommon.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: create_categories_input!) {
  create_categories_item(data: $data) {
    id
    name
    description
    boutique_id {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID!, $data: update_categories_input!) {
  update_categories_item(id: $id, data: $data) {
    id
    name
    description
    boutique_id {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  delete_categories_item(id: $id) {
    id
  }
}
    `;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetCustomersDocument = gql`
    query GetCustomers($boutiqueId: GraphQLStringOrFloat) {
  customers(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    nick_name
    full_name
    contact
    address
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
    user_updated {
      id
      first_name
      last_name
      email
    }
    boutique {
      id
      name
      address
    }
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = ApolloReactCommon.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetAllCustomersDocument = gql`
    query GetAllCustomers {
  customers {
    id
    nick_name
    full_name
    contact
    address
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
    user_updated {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetAllCustomersQuery__
 *
 * To run a query within a React component, call `useGetAllCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, options);
      }
export function useGetAllCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, options);
        }
export function useGetAllCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, options);
        }
export type GetAllCustomersQueryHookResult = ReturnType<typeof useGetAllCustomersQuery>;
export type GetAllCustomersLazyQueryHookResult = ReturnType<typeof useGetAllCustomersLazyQuery>;
export type GetAllCustomersSuspenseQueryHookResult = ReturnType<typeof useGetAllCustomersSuspenseQuery>;
export type GetAllCustomersQueryResult = ApolloReactCommon.QueryResult<GetAllCustomersQuery, GetAllCustomersQueryVariables>;
export const GetCustomerByIdDocument = gql`
    query GetCustomerById($id: ID!) {
  customers_by_id(id: $id) {
    id
    nick_name
    full_name
    contact
    address
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
    user_updated {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetCustomerByIdQuery__
 *
 * To run a query within a React component, call `useGetCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCustomerByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables> & ({ variables: GetCustomerByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
      }
export function useGetCustomerByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export function useGetCustomerByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export type GetCustomerByIdQueryHookResult = ReturnType<typeof useGetCustomerByIdQuery>;
export type GetCustomerByIdLazyQueryHookResult = ReturnType<typeof useGetCustomerByIdLazyQuery>;
export type GetCustomerByIdSuspenseQueryHookResult = ReturnType<typeof useGetCustomerByIdSuspenseQuery>;
export type GetCustomerByIdQueryResult = ApolloReactCommon.QueryResult<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($data: create_customers_input!) {
  create_customers_item(data: $data) {
    id
    nick_name
    full_name
    contact
    address
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
  }
}
    `;
export type CreateCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = ApolloReactCommon.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($id: ID!, $data: update_customers_input!) {
  update_customers_item(id: $id, data: $data) {
    id
    nick_name
    full_name
    contact
    address
    open_id
    avatar
    sex
    status
    type
    sort
    date_created
    date_updated
  }
}
    `;
export type UpdateCustomerMutationFn = ApolloReactCommon.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = ApolloReactCommon.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation DeleteCustomer($id: ID!) {
  delete_customers_item(id: $id) {
    id
  }
}
    `;
export type DeleteCustomerMutationFn = ApolloReactCommon.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = ApolloReactCommon.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const GetDashboardDataDocument = gql`
    query GetDashboardData($today: String, $userId: ID) {
  customers(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  products(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  orders(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  categories(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  boutiques(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  terminals(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  views(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  visits(filter: {user_created: {id: {_eq: $userId}}}, limit: 1000) {
    id
  }
  customers_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  products_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  orders_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  categories_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  boutiques_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  terminals_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  views_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  visits_aggregated(filter: {user_created: {id: {_eq: $userId}}}) {
    countAll
  }
  today_orders: orders(
    filter: {date_created: {_gte: $today}, user_created: {id: {_eq: $userId}}}
  ) {
    id
    status
  }
}
    `;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *      today: // value for 'today'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetDashboardDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export function useGetDashboardDataSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataSuspenseQuery>;
export type GetDashboardDataQueryResult = ApolloReactCommon.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetAllDashboardDataDocument = gql`
    query GetAllDashboardData($today: String) {
  customers(limit: 1000) {
    id
  }
  products(limit: 1000) {
    id
  }
  orders(limit: 1000) {
    id
  }
  categories(limit: 1000) {
    id
  }
  boutiques(limit: 1000) {
    id
  }
  customers_aggregated {
    countAll
  }
  products_aggregated {
    countAll
  }
  orders_aggregated {
    countAll
  }
  categories_aggregated {
    countAll
  }
  boutiques_aggregated {
    countAll
  }
  today_orders: orders(filter: {date_created: {_gte: $today}}) {
    id
    status
  }
}
    `;

/**
 * __useGetAllDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetAllDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDashboardDataQuery({
 *   variables: {
 *      today: // value for 'today'
 *   },
 * });
 */
export function useGetAllDashboardDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>(GetAllDashboardDataDocument, options);
      }
export function useGetAllDashboardDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>(GetAllDashboardDataDocument, options);
        }
export function useGetAllDashboardDataSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>(GetAllDashboardDataDocument, options);
        }
export type GetAllDashboardDataQueryHookResult = ReturnType<typeof useGetAllDashboardDataQuery>;
export type GetAllDashboardDataLazyQueryHookResult = ReturnType<typeof useGetAllDashboardDataLazyQuery>;
export type GetAllDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetAllDashboardDataSuspenseQuery>;
export type GetAllDashboardDataQueryResult = ApolloReactCommon.QueryResult<GetAllDashboardDataQuery, GetAllDashboardDataQueryVariables>;
export const GetRecentOrdersDocument = gql`
    query GetRecentOrders($limit: Int = 5, $userId: ID) {
  orders(
    filter: {user_created: {id: {_eq: $userId}}}
    limit: $limit
    sort: ["-date_created"]
  ) {
    id
    customer {
      id
      nick_name
    }
    total_price
    status
    date_created
  }
}
    `;

/**
 * __useGetRecentOrdersQuery__
 *
 * To run a query within a React component, call `useGetRecentOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetRecentOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>(GetRecentOrdersDocument, options);
      }
export function useGetRecentOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>(GetRecentOrdersDocument, options);
        }
export function useGetRecentOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>(GetRecentOrdersDocument, options);
        }
export type GetRecentOrdersQueryHookResult = ReturnType<typeof useGetRecentOrdersQuery>;
export type GetRecentOrdersLazyQueryHookResult = ReturnType<typeof useGetRecentOrdersLazyQuery>;
export type GetRecentOrdersSuspenseQueryHookResult = ReturnType<typeof useGetRecentOrdersSuspenseQuery>;
export type GetRecentOrdersQueryResult = ApolloReactCommon.QueryResult<GetRecentOrdersQuery, GetRecentOrdersQueryVariables>;
export const GetAllRecentOrdersDocument = gql`
    query GetAllRecentOrders($limit: Int = 5) {
  orders(limit: $limit, sort: ["-date_created"]) {
    id
    customer {
      id
      nick_name
    }
    total_price
    status
    date_created
  }
}
    `;

/**
 * __useGetAllRecentOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllRecentOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRecentOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRecentOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllRecentOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>(GetAllRecentOrdersDocument, options);
      }
export function useGetAllRecentOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>(GetAllRecentOrdersDocument, options);
        }
export function useGetAllRecentOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>(GetAllRecentOrdersDocument, options);
        }
export type GetAllRecentOrdersQueryHookResult = ReturnType<typeof useGetAllRecentOrdersQuery>;
export type GetAllRecentOrdersLazyQueryHookResult = ReturnType<typeof useGetAllRecentOrdersLazyQuery>;
export type GetAllRecentOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllRecentOrdersSuspenseQuery>;
export type GetAllRecentOrdersQueryResult = ApolloReactCommon.QueryResult<GetAllRecentOrdersQuery, GetAllRecentOrdersQueryVariables>;
export const GetUserOrdersDocument = gql`
    query GetUserOrders($userId: ID!) {
  orders(filter: {boutique: {user_created: {id: {_eq: $userId}}}}) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetUserOrdersQuery__
 *
 * To run a query within a React component, call `useGetUserOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserOrdersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserOrdersQuery, GetUserOrdersQueryVariables> & ({ variables: GetUserOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserOrdersQuery, GetUserOrdersQueryVariables>(GetUserOrdersDocument, options);
      }
export function useGetUserOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserOrdersQuery, GetUserOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserOrdersQuery, GetUserOrdersQueryVariables>(GetUserOrdersDocument, options);
        }
export function useGetUserOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserOrdersQuery, GetUserOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserOrdersQuery, GetUserOrdersQueryVariables>(GetUserOrdersDocument, options);
        }
export type GetUserOrdersQueryHookResult = ReturnType<typeof useGetUserOrdersQuery>;
export type GetUserOrdersLazyQueryHookResult = ReturnType<typeof useGetUserOrdersLazyQuery>;
export type GetUserOrdersSuspenseQueryHookResult = ReturnType<typeof useGetUserOrdersSuspenseQuery>;
export type GetUserOrdersQueryResult = ApolloReactCommon.QueryResult<GetUserOrdersQuery, GetUserOrdersQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders($boutiqueId: GraphQLStringOrFloat) {
  orders(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = ApolloReactCommon.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetAllOrdersDocument = gql`
    query GetAllOrders {
  orders {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export function useGetAllOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersSuspenseQuery>;
export type GetAllOrdersQueryResult = ApolloReactCommon.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: ID!) {
  orders_by_id(id: $id) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables> & ({ variables: GetOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export function useGetOrderByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrderByIdSuspenseQuery>;
export type GetOrderByIdQueryResult = ApolloReactCommon.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($data: create_orders_input!) {
  create_orders_item(data: $data) {
    id
    customer {
      id
      nick_name
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
  }
}
    `;
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: ID!, $data: update_orders_input!) {
  update_orders_item(id: $id, data: $data) {
    id
    customer {
      id
      nick_name
    }
    boutique {
      id
      name
      address
    }
    total_price
    status
    date_created
    date_updated
  }
}
    `;
export type UpdateOrderMutationFn = ApolloReactCommon.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = ApolloReactCommon.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($id: ID!) {
  delete_orders_item(id: $id) {
    id
  }
}
    `;
export type DeleteOrderMutationFn = ApolloReactCommon.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = ApolloReactCommon.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const UpdateOrderStatusDocument = gql`
    mutation UpdateOrderStatus($id: ID!, $status: String!) {
  update_orders_item(id: $id, data: {status: $status}) {
    id
    status
    date_updated
  }
}
    `;
export type UpdateOrderStatusMutationFn = ApolloReactCommon.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = ApolloReactCommon.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const OrdersRealtimeDocument = gql`
    subscription OrdersRealtime {
  orders_mutated {
    key
    event
    data {
      id
      customer {
        id
        nick_name
        open_id
        avatar
        sex
      }
      boutique {
        id
        name
        address
      }
      total_price
      status
      date_created
      date_updated
    }
  }
}
    `;

/**
 * __useOrdersRealtimeSubscription__
 *
 * To run a query within a React component, call `useOrdersRealtimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrdersRealtimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersRealtimeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOrdersRealtimeSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OrdersRealtimeSubscription, OrdersRealtimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<OrdersRealtimeSubscription, OrdersRealtimeSubscriptionVariables>(OrdersRealtimeDocument, options);
      }
export type OrdersRealtimeSubscriptionHookResult = ReturnType<typeof useOrdersRealtimeSubscription>;
export type OrdersRealtimeSubscriptionResult = ApolloReactCommon.SubscriptionResult<OrdersRealtimeSubscription>;
export const GetProductsDocument = gql`
    query GetProducts($userId: ID) {
  products(filter: {boutique_id: {user_created: {id: {_eq: $userId}}}}) {
    id
    name
    subtitle
    description
    price
    market_price
    stock
    barcode
    location
    brand
    boutique_id {
      id
      name
      address
    }
    category_id {
      id
      name
    }
    seller_id
    main_image
    images
    carousel_images
    video_url
    is_on_sale
    carousel
    status
    total_sales_volume
    rating_avg
    total_reviews
    created_at
    date_created
    updated_at
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    id
    name
    subtitle
    description
    price
    market_price
    stock
    barcode
    location
    brand
    boutique_id {
      id
      name
      address
    }
    category_id {
      id
      name
    }
    seller_id
    main_image
    images
    carousel_images
    video_url
    is_on_sale
    carousel
    status
    total_sales_volume
    rating_avg
    total_reviews
    created_at
    date_created
    updated_at
    date_updated
    user_created {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = ApolloReactCommon.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($id: ID!) {
  products_by_id(id: $id) {
    id
    name
    subtitle
    description
    price
    market_price
    stock
    barcode
    location
    brand
    boutique_id {
      id
      name
      address
    }
    category_id {
      id
      name
    }
    seller_id
    main_image
    images
    carousel_images
    video_url
    is_on_sale
    carousel
    status
    total_sales_volume
    rating_avg
    total_reviews
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = ApolloReactCommon.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: create_products_input!) {
  create_products_item(data: $data) {
    id
    name
    subtitle
    description
    price
    market_price
    stock
    barcode
    location
    brand
    boutique_id {
      id
      name
      address
    }
    category_id {
      id
      name
    }
    seller_id
    main_image
    images
    carousel_images
    video_url
    is_on_sale
    carousel
    status
    total_sales_volume
    rating_avg
    total_reviews
    created_at
    updated_at
  }
}
    `;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $data: update_products_input!) {
  update_products_item(id: $id, data: $data) {
    id
    name
    subtitle
    description
    price
    market_price
    stock
    barcode
    location
    brand
    boutique_id {
      id
      name
      address
    }
    category_id {
      id
      name
    }
    seller_id
    main_image
    images
    carousel_images
    video_url
    is_on_sale
    carousel
    status
    total_sales_volume
    rating_avg
    total_reviews
    created_at
    updated_at
  }
}
    `;
export type UpdateProductMutationFn = ApolloReactCommon.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = ApolloReactCommon.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  delete_products_item(id: $id) {
    id
  }
}
    `;
export type DeleteProductMutationFn = ApolloReactCommon.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = ApolloReactCommon.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetTerminalsDocument = gql`
    query GetTerminals($boutiqueId: GraphQLStringOrFloat) {
  terminals(filter: {authorized_boutique: {id: {_eq: $boutiqueId}}}) {
    id
    android_id
    authorized_boutique {
      id
      name
      address
    }
    brand
    device_name
    device_type
    manufacturer
    model_name
    os_name
    os_version
    purposes
    supported_cpu_architectures
    total_memory
    user_created {
      id
      first_name
      last_name
      email
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetTerminalsQuery__
 *
 * To run a query within a React component, call `useGetTerminalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTerminalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTerminalsQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetTerminalsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTerminalsQuery, GetTerminalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTerminalsQuery, GetTerminalsQueryVariables>(GetTerminalsDocument, options);
      }
export function useGetTerminalsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTerminalsQuery, GetTerminalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTerminalsQuery, GetTerminalsQueryVariables>(GetTerminalsDocument, options);
        }
export function useGetTerminalsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTerminalsQuery, GetTerminalsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTerminalsQuery, GetTerminalsQueryVariables>(GetTerminalsDocument, options);
        }
export type GetTerminalsQueryHookResult = ReturnType<typeof useGetTerminalsQuery>;
export type GetTerminalsLazyQueryHookResult = ReturnType<typeof useGetTerminalsLazyQuery>;
export type GetTerminalsSuspenseQueryHookResult = ReturnType<typeof useGetTerminalsSuspenseQuery>;
export type GetTerminalsQueryResult = ApolloReactCommon.QueryResult<GetTerminalsQuery, GetTerminalsQueryVariables>;
export const GetAllTerminalsDocument = gql`
    query GetAllTerminals {
  terminals {
    id
    user_created {
      id
      first_name
      last_name
      email
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetAllTerminalsQuery__
 *
 * To run a query within a React component, call `useGetAllTerminalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTerminalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTerminalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTerminalsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>(GetAllTerminalsDocument, options);
      }
export function useGetAllTerminalsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>(GetAllTerminalsDocument, options);
        }
export function useGetAllTerminalsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>(GetAllTerminalsDocument, options);
        }
export type GetAllTerminalsQueryHookResult = ReturnType<typeof useGetAllTerminalsQuery>;
export type GetAllTerminalsLazyQueryHookResult = ReturnType<typeof useGetAllTerminalsLazyQuery>;
export type GetAllTerminalsSuspenseQueryHookResult = ReturnType<typeof useGetAllTerminalsSuspenseQuery>;
export type GetAllTerminalsQueryResult = ApolloReactCommon.QueryResult<GetAllTerminalsQuery, GetAllTerminalsQueryVariables>;
export const GetTerminalByIdDocument = gql`
    query GetTerminalById($id: ID!) {
  terminals_by_id(id: $id) {
    id
    user_created {
      id
      first_name
      last_name
      email
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetTerminalByIdQuery__
 *
 * To run a query within a React component, call `useGetTerminalByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTerminalByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTerminalByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTerminalByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetTerminalByIdQuery, GetTerminalByIdQueryVariables> & ({ variables: GetTerminalByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>(GetTerminalByIdDocument, options);
      }
export function useGetTerminalByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>(GetTerminalByIdDocument, options);
        }
export function useGetTerminalByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>(GetTerminalByIdDocument, options);
        }
export type GetTerminalByIdQueryHookResult = ReturnType<typeof useGetTerminalByIdQuery>;
export type GetTerminalByIdLazyQueryHookResult = ReturnType<typeof useGetTerminalByIdLazyQuery>;
export type GetTerminalByIdSuspenseQueryHookResult = ReturnType<typeof useGetTerminalByIdSuspenseQuery>;
export type GetTerminalByIdQueryResult = ApolloReactCommon.QueryResult<GetTerminalByIdQuery, GetTerminalByIdQueryVariables>;
export const CreateTerminalDocument = gql`
    mutation CreateTerminal($data: create_terminals_input!) {
  create_terminals_item(data: $data) {
    id
    user_created {
      id
      first_name
      last_name
      email
    }
    date_created
    date_updated
  }
}
    `;
export type CreateTerminalMutationFn = ApolloReactCommon.MutationFunction<CreateTerminalMutation, CreateTerminalMutationVariables>;

/**
 * __useCreateTerminalMutation__
 *
 * To run a mutation, you first call `useCreateTerminalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTerminalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTerminalMutation, { data, loading, error }] = useCreateTerminalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTerminalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTerminalMutation, CreateTerminalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateTerminalMutation, CreateTerminalMutationVariables>(CreateTerminalDocument, options);
      }
export type CreateTerminalMutationHookResult = ReturnType<typeof useCreateTerminalMutation>;
export type CreateTerminalMutationResult = ApolloReactCommon.MutationResult<CreateTerminalMutation>;
export type CreateTerminalMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTerminalMutation, CreateTerminalMutationVariables>;
export const UpdateTerminalDocument = gql`
    mutation UpdateTerminal($id: ID!, $data: update_terminals_input!) {
  update_terminals_item(id: $id, data: $data) {
    id
    user_created {
      id
      first_name
      last_name
      email
    }
    date_created
    date_updated
  }
}
    `;
export type UpdateTerminalMutationFn = ApolloReactCommon.MutationFunction<UpdateTerminalMutation, UpdateTerminalMutationVariables>;

/**
 * __useUpdateTerminalMutation__
 *
 * To run a mutation, you first call `useUpdateTerminalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTerminalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTerminalMutation, { data, loading, error }] = useUpdateTerminalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTerminalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTerminalMutation, UpdateTerminalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTerminalMutation, UpdateTerminalMutationVariables>(UpdateTerminalDocument, options);
      }
export type UpdateTerminalMutationHookResult = ReturnType<typeof useUpdateTerminalMutation>;
export type UpdateTerminalMutationResult = ApolloReactCommon.MutationResult<UpdateTerminalMutation>;
export type UpdateTerminalMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTerminalMutation, UpdateTerminalMutationVariables>;
export const DeleteTerminalDocument = gql`
    mutation DeleteTerminal($id: ID!) {
  delete_terminals_item(id: $id) {
    id
  }
}
    `;
export type DeleteTerminalMutationFn = ApolloReactCommon.MutationFunction<DeleteTerminalMutation, DeleteTerminalMutationVariables>;

/**
 * __useDeleteTerminalMutation__
 *
 * To run a mutation, you first call `useDeleteTerminalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTerminalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTerminalMutation, { data, loading, error }] = useDeleteTerminalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTerminalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTerminalMutation, DeleteTerminalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteTerminalMutation, DeleteTerminalMutationVariables>(DeleteTerminalDocument, options);
      }
export type DeleteTerminalMutationHookResult = ReturnType<typeof useDeleteTerminalMutation>;
export type DeleteTerminalMutationResult = ApolloReactCommon.MutationResult<DeleteTerminalMutation>;
export type DeleteTerminalMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTerminalMutation, DeleteTerminalMutationVariables>;
export const DeleteTerminalsDocument = gql`
    mutation DeleteTerminals($ids: [ID]!) {
  delete_terminals_items(ids: $ids) {
    ids
  }
}
    `;
export type DeleteTerminalsMutationFn = ApolloReactCommon.MutationFunction<DeleteTerminalsMutation, DeleteTerminalsMutationVariables>;

/**
 * __useDeleteTerminalsMutation__
 *
 * To run a mutation, you first call `useDeleteTerminalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTerminalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTerminalsMutation, { data, loading, error }] = useDeleteTerminalsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteTerminalsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTerminalsMutation, DeleteTerminalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteTerminalsMutation, DeleteTerminalsMutationVariables>(DeleteTerminalsDocument, options);
      }
export type DeleteTerminalsMutationHookResult = ReturnType<typeof useDeleteTerminalsMutation>;
export type DeleteTerminalsMutationResult = ApolloReactCommon.MutationResult<DeleteTerminalsMutation>;
export type DeleteTerminalsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTerminalsMutation, DeleteTerminalsMutationVariables>;
export const GetViewsDocument = gql`
    query GetViews($boutiqueId: GraphQLStringOrFloat) {
  views(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    product {
      id
      name
      main_image
      price
      market_price
    }
    boutique {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetViewsQuery__
 *
 * To run a query within a React component, call `useGetViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewsQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetViewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewsQuery, GetViewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetViewsQuery, GetViewsQueryVariables>(GetViewsDocument, options);
      }
export function useGetViewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewsQuery, GetViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetViewsQuery, GetViewsQueryVariables>(GetViewsDocument, options);
        }
export function useGetViewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetViewsQuery, GetViewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetViewsQuery, GetViewsQueryVariables>(GetViewsDocument, options);
        }
export type GetViewsQueryHookResult = ReturnType<typeof useGetViewsQuery>;
export type GetViewsLazyQueryHookResult = ReturnType<typeof useGetViewsLazyQuery>;
export type GetViewsSuspenseQueryHookResult = ReturnType<typeof useGetViewsSuspenseQuery>;
export type GetViewsQueryResult = ApolloReactCommon.QueryResult<GetViewsQuery, GetViewsQueryVariables>;
export const GetAllViewsDocument = gql`
    query GetAllViews {
  views {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    product {
      id
      name
      main_image
      price
      market_price
    }
    boutique {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetAllViewsQuery__
 *
 * To run a query within a React component, call `useGetAllViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllViewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllViewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllViewsQuery, GetAllViewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllViewsQuery, GetAllViewsQueryVariables>(GetAllViewsDocument, options);
      }
export function useGetAllViewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllViewsQuery, GetAllViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllViewsQuery, GetAllViewsQueryVariables>(GetAllViewsDocument, options);
        }
export function useGetAllViewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllViewsQuery, GetAllViewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllViewsQuery, GetAllViewsQueryVariables>(GetAllViewsDocument, options);
        }
export type GetAllViewsQueryHookResult = ReturnType<typeof useGetAllViewsQuery>;
export type GetAllViewsLazyQueryHookResult = ReturnType<typeof useGetAllViewsLazyQuery>;
export type GetAllViewsSuspenseQueryHookResult = ReturnType<typeof useGetAllViewsSuspenseQuery>;
export type GetAllViewsQueryResult = ApolloReactCommon.QueryResult<GetAllViewsQuery, GetAllViewsQueryVariables>;
export const GetViewsByCustomerDocument = gql`
    query GetViewsByCustomer($customerId: GraphQLStringOrFloat!) {
  views(filter: {customer: {id: {_eq: $customerId}}}) {
    id
    customer {
      id
      nick_name
      open_id
    }
    product {
      id
      name
      main_image
      price
      market_price
    }
    boutique {
      id
      name
      address
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetViewsByCustomerQuery__
 *
 * To run a query within a React component, call `useGetViewsByCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewsByCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewsByCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetViewsByCustomerQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables> & ({ variables: GetViewsByCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>(GetViewsByCustomerDocument, options);
      }
export function useGetViewsByCustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>(GetViewsByCustomerDocument, options);
        }
export function useGetViewsByCustomerSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>(GetViewsByCustomerDocument, options);
        }
export type GetViewsByCustomerQueryHookResult = ReturnType<typeof useGetViewsByCustomerQuery>;
export type GetViewsByCustomerLazyQueryHookResult = ReturnType<typeof useGetViewsByCustomerLazyQuery>;
export type GetViewsByCustomerSuspenseQueryHookResult = ReturnType<typeof useGetViewsByCustomerSuspenseQuery>;
export type GetViewsByCustomerQueryResult = ApolloReactCommon.QueryResult<GetViewsByCustomerQuery, GetViewsByCustomerQueryVariables>;
export const GetViewsByProductDocument = gql`
    query GetViewsByProduct($productId: GraphQLStringOrFloat!) {
  views(filter: {product: {id: {_eq: $productId}}}) {
    id
    customer {
      id
      nick_name
      open_id
    }
    product {
      id
      name
    }
    boutique {
      id
      name
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetViewsByProductQuery__
 *
 * To run a query within a React component, call `useGetViewsByProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewsByProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewsByProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetViewsByProductQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetViewsByProductQuery, GetViewsByProductQueryVariables> & ({ variables: GetViewsByProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetViewsByProductQuery, GetViewsByProductQueryVariables>(GetViewsByProductDocument, options);
      }
export function useGetViewsByProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewsByProductQuery, GetViewsByProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetViewsByProductQuery, GetViewsByProductQueryVariables>(GetViewsByProductDocument, options);
        }
export function useGetViewsByProductSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetViewsByProductQuery, GetViewsByProductQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetViewsByProductQuery, GetViewsByProductQueryVariables>(GetViewsByProductDocument, options);
        }
export type GetViewsByProductQueryHookResult = ReturnType<typeof useGetViewsByProductQuery>;
export type GetViewsByProductLazyQueryHookResult = ReturnType<typeof useGetViewsByProductLazyQuery>;
export type GetViewsByProductSuspenseQueryHookResult = ReturnType<typeof useGetViewsByProductSuspenseQuery>;
export type GetViewsByProductQueryResult = ApolloReactCommon.QueryResult<GetViewsByProductQuery, GetViewsByProductQueryVariables>;
export const GetViewsByBoutiqueDocument = gql`
    query GetViewsByBoutique($boutiqueId: GraphQLStringOrFloat!) {
  views(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    customer {
      id
      nick_name
      open_id
    }
    product {
      id
      name
      main_image
      price
    }
    boutique {
      id
      name
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetViewsByBoutiqueQuery__
 *
 * To run a query within a React component, call `useGetViewsByBoutiqueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewsByBoutiqueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewsByBoutiqueQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetViewsByBoutiqueQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables> & ({ variables: GetViewsByBoutiqueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>(GetViewsByBoutiqueDocument, options);
      }
export function useGetViewsByBoutiqueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>(GetViewsByBoutiqueDocument, options);
        }
export function useGetViewsByBoutiqueSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>(GetViewsByBoutiqueDocument, options);
        }
export type GetViewsByBoutiqueQueryHookResult = ReturnType<typeof useGetViewsByBoutiqueQuery>;
export type GetViewsByBoutiqueLazyQueryHookResult = ReturnType<typeof useGetViewsByBoutiqueLazyQuery>;
export type GetViewsByBoutiqueSuspenseQueryHookResult = ReturnType<typeof useGetViewsByBoutiqueSuspenseQuery>;
export type GetViewsByBoutiqueQueryResult = ApolloReactCommon.QueryResult<GetViewsByBoutiqueQuery, GetViewsByBoutiqueQueryVariables>;
export const CreateViewDocument = gql`
    mutation CreateView($data: create_views_input!) {
  create_views_item(data: $data) {
    id
    customer {
      id
      nick_name
    }
    product {
      id
      name
    }
    boutique {
      id
      name
    }
    date_created
  }
}
    `;
export type CreateViewMutationFn = ApolloReactCommon.MutationFunction<CreateViewMutation, CreateViewMutationVariables>;

/**
 * __useCreateViewMutation__
 *
 * To run a mutation, you first call `useCreateViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createViewMutation, { data, loading, error }] = useCreateViewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateViewMutation, CreateViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateViewMutation, CreateViewMutationVariables>(CreateViewDocument, options);
      }
export type CreateViewMutationHookResult = ReturnType<typeof useCreateViewMutation>;
export type CreateViewMutationResult = ApolloReactCommon.MutationResult<CreateViewMutation>;
export type CreateViewMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateViewMutation, CreateViewMutationVariables>;
export const UpdateViewDocument = gql`
    mutation UpdateView($id: ID!, $data: update_views_input!) {
  update_views_item(id: $id, data: $data) {
    id
    customer {
      id
      nick_name
    }
    product {
      id
      name
    }
    boutique {
      id
      name
    }
    date_created
    date_updated
  }
}
    `;
export type UpdateViewMutationFn = ApolloReactCommon.MutationFunction<UpdateViewMutation, UpdateViewMutationVariables>;

/**
 * __useUpdateViewMutation__
 *
 * To run a mutation, you first call `useUpdateViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateViewMutation, { data, loading, error }] = useUpdateViewMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateViewMutation, UpdateViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateViewMutation, UpdateViewMutationVariables>(UpdateViewDocument, options);
      }
export type UpdateViewMutationHookResult = ReturnType<typeof useUpdateViewMutation>;
export type UpdateViewMutationResult = ApolloReactCommon.MutationResult<UpdateViewMutation>;
export type UpdateViewMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateViewMutation, UpdateViewMutationVariables>;
export const DeleteViewDocument = gql`
    mutation DeleteView($id: ID!) {
  delete_views_item(id: $id) {
    id
  }
}
    `;
export type DeleteViewMutationFn = ApolloReactCommon.MutationFunction<DeleteViewMutation, DeleteViewMutationVariables>;

/**
 * __useDeleteViewMutation__
 *
 * To run a mutation, you first call `useDeleteViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteViewMutation, { data, loading, error }] = useDeleteViewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteViewMutation, DeleteViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteViewMutation, DeleteViewMutationVariables>(DeleteViewDocument, options);
      }
export type DeleteViewMutationHookResult = ReturnType<typeof useDeleteViewMutation>;
export type DeleteViewMutationResult = ApolloReactCommon.MutationResult<DeleteViewMutation>;
export type DeleteViewMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteViewMutation, DeleteViewMutationVariables>;
export const DeleteViewsDocument = gql`
    mutation DeleteViews($ids: [ID]!) {
  delete_views_items(ids: $ids) {
    ids
  }
}
    `;
export type DeleteViewsMutationFn = ApolloReactCommon.MutationFunction<DeleteViewsMutation, DeleteViewsMutationVariables>;

/**
 * __useDeleteViewsMutation__
 *
 * To run a mutation, you first call `useDeleteViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteViewsMutation, { data, loading, error }] = useDeleteViewsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteViewsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteViewsMutation, DeleteViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteViewsMutation, DeleteViewsMutationVariables>(DeleteViewsDocument, options);
      }
export type DeleteViewsMutationHookResult = ReturnType<typeof useDeleteViewsMutation>;
export type DeleteViewsMutationResult = ApolloReactCommon.MutationResult<DeleteViewsMutation>;
export type DeleteViewsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteViewsMutation, DeleteViewsMutationVariables>;
export const GetVisitsDocument = gql`
    query GetVisits($boutiqueId: GraphQLStringOrFloat) {
  visits(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
      city
      category
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetVisitsQuery__
 *
 * To run a query within a React component, call `useGetVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVisitsQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetVisitsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVisitsQuery, GetVisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetVisitsQuery, GetVisitsQueryVariables>(GetVisitsDocument, options);
      }
export function useGetVisitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVisitsQuery, GetVisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetVisitsQuery, GetVisitsQueryVariables>(GetVisitsDocument, options);
        }
export function useGetVisitsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVisitsQuery, GetVisitsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetVisitsQuery, GetVisitsQueryVariables>(GetVisitsDocument, options);
        }
export type GetVisitsQueryHookResult = ReturnType<typeof useGetVisitsQuery>;
export type GetVisitsLazyQueryHookResult = ReturnType<typeof useGetVisitsLazyQuery>;
export type GetVisitsSuspenseQueryHookResult = ReturnType<typeof useGetVisitsSuspenseQuery>;
export type GetVisitsQueryResult = ApolloReactCommon.QueryResult<GetVisitsQuery, GetVisitsQueryVariables>;
export const GetAllVisitsDocument = gql`
    query GetAllVisits {
  visits {
    id
    customer {
      id
      nick_name
      open_id
      avatar
      sex
    }
    boutique {
      id
      name
      address
      city
      category
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetAllVisitsQuery__
 *
 * To run a query within a React component, call `useGetAllVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVisitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllVisitsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllVisitsQuery, GetAllVisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllVisitsQuery, GetAllVisitsQueryVariables>(GetAllVisitsDocument, options);
      }
export function useGetAllVisitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllVisitsQuery, GetAllVisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllVisitsQuery, GetAllVisitsQueryVariables>(GetAllVisitsDocument, options);
        }
export function useGetAllVisitsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllVisitsQuery, GetAllVisitsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllVisitsQuery, GetAllVisitsQueryVariables>(GetAllVisitsDocument, options);
        }
export type GetAllVisitsQueryHookResult = ReturnType<typeof useGetAllVisitsQuery>;
export type GetAllVisitsLazyQueryHookResult = ReturnType<typeof useGetAllVisitsLazyQuery>;
export type GetAllVisitsSuspenseQueryHookResult = ReturnType<typeof useGetAllVisitsSuspenseQuery>;
export type GetAllVisitsQueryResult = ApolloReactCommon.QueryResult<GetAllVisitsQuery, GetAllVisitsQueryVariables>;
export const GetVisitsByCustomerDocument = gql`
    query GetVisitsByCustomer($customerId: GraphQLStringOrFloat!) {
  visits(filter: {customer: {id: {_eq: $customerId}}}) {
    id
    customer {
      id
      nick_name
      open_id
    }
    boutique {
      id
      name
      address
      city
      category
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetVisitsByCustomerQuery__
 *
 * To run a query within a React component, call `useGetVisitsByCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVisitsByCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVisitsByCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetVisitsByCustomerQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables> & ({ variables: GetVisitsByCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>(GetVisitsByCustomerDocument, options);
      }
export function useGetVisitsByCustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>(GetVisitsByCustomerDocument, options);
        }
export function useGetVisitsByCustomerSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>(GetVisitsByCustomerDocument, options);
        }
export type GetVisitsByCustomerQueryHookResult = ReturnType<typeof useGetVisitsByCustomerQuery>;
export type GetVisitsByCustomerLazyQueryHookResult = ReturnType<typeof useGetVisitsByCustomerLazyQuery>;
export type GetVisitsByCustomerSuspenseQueryHookResult = ReturnType<typeof useGetVisitsByCustomerSuspenseQuery>;
export type GetVisitsByCustomerQueryResult = ApolloReactCommon.QueryResult<GetVisitsByCustomerQuery, GetVisitsByCustomerQueryVariables>;
export const GetVisitsByBoutiqueDocument = gql`
    query GetVisitsByBoutique($boutiqueId: GraphQLStringOrFloat!) {
  visits(filter: {boutique: {id: {_eq: $boutiqueId}}}) {
    id
    customer {
      id
      nick_name
      open_id
      avatar
    }
    boutique {
      id
      name
    }
    date_created
    date_updated
  }
}
    `;

/**
 * __useGetVisitsByBoutiqueQuery__
 *
 * To run a query within a React component, call `useGetVisitsByBoutiqueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVisitsByBoutiqueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVisitsByBoutiqueQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *   },
 * });
 */
export function useGetVisitsByBoutiqueQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables> & ({ variables: GetVisitsByBoutiqueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>(GetVisitsByBoutiqueDocument, options);
      }
export function useGetVisitsByBoutiqueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>(GetVisitsByBoutiqueDocument, options);
        }
export function useGetVisitsByBoutiqueSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>(GetVisitsByBoutiqueDocument, options);
        }
export type GetVisitsByBoutiqueQueryHookResult = ReturnType<typeof useGetVisitsByBoutiqueQuery>;
export type GetVisitsByBoutiqueLazyQueryHookResult = ReturnType<typeof useGetVisitsByBoutiqueLazyQuery>;
export type GetVisitsByBoutiqueSuspenseQueryHookResult = ReturnType<typeof useGetVisitsByBoutiqueSuspenseQuery>;
export type GetVisitsByBoutiqueQueryResult = ApolloReactCommon.QueryResult<GetVisitsByBoutiqueQuery, GetVisitsByBoutiqueQueryVariables>;
export const GetVisitStatsDocument = gql`
    query GetVisitStats($boutiqueId: GraphQLStringOrFloat, $startDate: String, $endDate: String) {
  visits_aggregated(
    filter: {_and: [{boutique: {id: {_eq: $boutiqueId}}}, {date_created: {_gte: $startDate}}, {date_created: {_lte: $endDate}}]}
    groupBy: ["date_created"]
  ) {
    group
    countAll
  }
}
    `;

/**
 * __useGetVisitStatsQuery__
 *
 * To run a query within a React component, call `useGetVisitStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVisitStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVisitStatsQuery({
 *   variables: {
 *      boutiqueId: // value for 'boutiqueId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetVisitStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVisitStatsQuery, GetVisitStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetVisitStatsQuery, GetVisitStatsQueryVariables>(GetVisitStatsDocument, options);
      }
export function useGetVisitStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVisitStatsQuery, GetVisitStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetVisitStatsQuery, GetVisitStatsQueryVariables>(GetVisitStatsDocument, options);
        }
export function useGetVisitStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVisitStatsQuery, GetVisitStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetVisitStatsQuery, GetVisitStatsQueryVariables>(GetVisitStatsDocument, options);
        }
export type GetVisitStatsQueryHookResult = ReturnType<typeof useGetVisitStatsQuery>;
export type GetVisitStatsLazyQueryHookResult = ReturnType<typeof useGetVisitStatsLazyQuery>;
export type GetVisitStatsSuspenseQueryHookResult = ReturnType<typeof useGetVisitStatsSuspenseQuery>;
export type GetVisitStatsQueryResult = ApolloReactCommon.QueryResult<GetVisitStatsQuery, GetVisitStatsQueryVariables>;
export const CreateVisitDocument = gql`
    mutation CreateVisit($data: create_visits_input!) {
  create_visits_item(data: $data) {
    id
    customer {
      id
      nick_name
    }
    boutique {
      id
      name
    }
    date_created
  }
}
    `;
export type CreateVisitMutationFn = ApolloReactCommon.MutationFunction<CreateVisitMutation, CreateVisitMutationVariables>;

/**
 * __useCreateVisitMutation__
 *
 * To run a mutation, you first call `useCreateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitMutation, { data, loading, error }] = useCreateVisitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVisitMutation, CreateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CreateVisitDocument, options);
      }
export type CreateVisitMutationHookResult = ReturnType<typeof useCreateVisitMutation>;
export type CreateVisitMutationResult = ApolloReactCommon.MutationResult<CreateVisitMutation>;
export type CreateVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVisitMutation, CreateVisitMutationVariables>;
export const UpdateVisitDocument = gql`
    mutation UpdateVisit($id: ID!, $data: update_visits_input!) {
  update_visits_item(id: $id, data: $data) {
    id
    customer {
      id
      nick_name
    }
    boutique {
      id
      name
    }
    date_created
    date_updated
  }
}
    `;
export type UpdateVisitMutationFn = ApolloReactCommon.MutationFunction<UpdateVisitMutation, UpdateVisitMutationVariables>;

/**
 * __useUpdateVisitMutation__
 *
 * To run a mutation, you first call `useUpdateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitMutation, { data, loading, error }] = useUpdateVisitMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVisitMutation, UpdateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateVisitMutation, UpdateVisitMutationVariables>(UpdateVisitDocument, options);
      }
export type UpdateVisitMutationHookResult = ReturnType<typeof useUpdateVisitMutation>;
export type UpdateVisitMutationResult = ApolloReactCommon.MutationResult<UpdateVisitMutation>;
export type UpdateVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVisitMutation, UpdateVisitMutationVariables>;
export const DeleteVisitDocument = gql`
    mutation DeleteVisit($id: ID!) {
  delete_visits_item(id: $id) {
    id
  }
}
    `;
export type DeleteVisitMutationFn = ApolloReactCommon.MutationFunction<DeleteVisitMutation, DeleteVisitMutationVariables>;

/**
 * __useDeleteVisitMutation__
 *
 * To run a mutation, you first call `useDeleteVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVisitMutation, { data, loading, error }] = useDeleteVisitMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteVisitMutation, DeleteVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteVisitMutation, DeleteVisitMutationVariables>(DeleteVisitDocument, options);
      }
export type DeleteVisitMutationHookResult = ReturnType<typeof useDeleteVisitMutation>;
export type DeleteVisitMutationResult = ApolloReactCommon.MutationResult<DeleteVisitMutation>;
export type DeleteVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVisitMutation, DeleteVisitMutationVariables>;
export const DeleteVisitsDocument = gql`
    mutation DeleteVisits($ids: [ID]!) {
  delete_visits_items(ids: $ids) {
    ids
  }
}
    `;
export type DeleteVisitsMutationFn = ApolloReactCommon.MutationFunction<DeleteVisitsMutation, DeleteVisitsMutationVariables>;

/**
 * __useDeleteVisitsMutation__
 *
 * To run a mutation, you first call `useDeleteVisitsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVisitsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVisitsMutation, { data, loading, error }] = useDeleteVisitsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteVisitsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteVisitsMutation, DeleteVisitsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteVisitsMutation, DeleteVisitsMutationVariables>(DeleteVisitsDocument, options);
      }
export type DeleteVisitsMutationHookResult = ReturnType<typeof useDeleteVisitsMutation>;
export type DeleteVisitsMutationResult = ApolloReactCommon.MutationResult<DeleteVisitsMutation>;
export type DeleteVisitsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVisitsMutation, DeleteVisitsMutationVariables>;