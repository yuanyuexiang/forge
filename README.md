This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



好的，接下来我会为您提供一个使用 **Next.js + Apollo Client + Ant Design** 技术栈来构建前端管理系统的详细开发指南。

这个指南将涵盖以下几个关键步骤：

1.  **项目初始化**: 如何使用 `create-next-app` 创建一个 Next.js 项目。
2.  **集成 Ant Design**: 如何在 Next.js 项目中正确配置和使用 Ant Design。
3.  **配置 Apollo Client**: 如何在 Next.js 中设置 Apollo Client 来连接您的 Directus GraphQL API。
4.  **自动代码生成**: 如何使用 `graphql-codegen` 工具，根据您的 `schema.graphql` 文件自动生成类型安全的代码和 React Hooks。

### Step 1: 项目初始化

首先，使用 `create-next-app` 创建一个新的 Next.js 项目。

在您的终端中运行以下命令：

```bash
npx create-next-app@latest next-admin-dashboard --typescript --tailwind --eslint
```

  * `next-admin-dashboard`: 您的项目名称。
  * `--typescript`: 使用 TypeScript 模板。
  * `--tailwind`: 集成 Tailwind CSS，虽然我们将主要使用 Ant Design，但 Tailwind 可以用于快速布局和样式调整。
  * `--eslint`: 集成 ESLint。

### Step 2: 集成 Ant Design

Next.js 默认不支持在服务器端渲染时直接加载 CSS-in-JS 库（如 Ant Design），需要额外配置。

1.  **安装依赖**:

    ```bash
    npm install antd @ant-design/icons
    ```

2.  **配置 Babel**:
    由于 Next.js 13 及以上版本默认使用 SWC，为了兼容 Ant Design 的按需加载，我们需要安装 `@ant-design/babel-plugin-import`。

    在项目根目录下创建一个 `.babelrc` 文件（如果已存在则修改）：

    ```json
    {
      "plugins": [
        [
          "import",
          {
            "libraryName": "antd",
            "style": true, // 或者 "css"
            "libraryDirectory": "es"
          }
        ]
      ]
    }
    ```

      * **注意**：对于最新的 Next.js 版本，您可能需要手动配置 `next.config.js` 来加载 CSS。

3.  **在 `next.config.js` 中配置**:
    打开 `next.config.js` 文件，添加 `@next/ant-design-plugin` 或类似配置以支持 Antd。

4.  **全局样式文件**:
    在 `pages/_app.tsx` 文件中，导入 Ant Design 的样式文件。

    ```tsx
    import type { AppProps } from 'next/app'
    import 'antd/dist/reset.css'; // 新版本使用此文件
    import '../styles/globals.css'

    function MyApp({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />
    }

    export default MyApp
    ```

### Step 3: 配置 Apollo Client

1.  **安装依赖**:

    ```bash
    npm install @apollo/client graphql
    ```

2.  **创建 Apollo Client 实例**:
    在 `lib/apollo-client.ts` 或类似位置创建一个文件，用于创建 Apollo Client 实例。

    ```typescript
    import { ApolloClient, InMemoryCache } from "@apollo/client";

    const client = new ApolloClient({
      uri: "YOUR_DIRECTUS_GRAPHQL_API_URL", // 替换为您的 Directus API 地址
      cache: new InMemoryCache(),
    });

    export default client;
    ```

      * **注意**：如果您需要身份验证，您还需要配置 `link` 来传递您的身份验证令牌。

3.  **提供 Apollo Provider**:
    在 `pages/_app.tsx` 文件中，使用 `<ApolloProvider>` 来包裹您的应用程序。

    ```tsx
    import { ApolloProvider } from "@apollo/client";
    import client from "../lib/apollo-client";
    import type { AppProps } from 'next/app'
    import 'antd/dist/reset.css';
    import '../styles/globals.css'

    function MyApp({ Component, pageProps }: AppProps) {
      return (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      );
    }

    export default MyApp;
    ```

### Step 4: 自动代码生成 (`graphql-codegen`)

按照之前的讨论，这是最重要的一步，它将为您提供类型安全和开发便利。

1.  **安装依赖**:

    ```bash
    npm install --save-dev @graphql-codegen/cli \
    @graphql-codegen/typescript \
    @graphql-codegen/typescript-operations \
    @graphql-codegen/typescript-react-apollo
    ```

2.  **创建 `codegen.yml`**:
    在您的项目根目录下创建此文件，并指向您的 `schema.graphql`。

    ```yaml
    overwrite: true
    schema: "./schema.graphql"
    documents: "src/**/*.{gql,graphql}" # 您存放 GraphQL 查询文件的目录

    generates:
      src/generated/graphql.ts:
        plugins:
          - "typescript"
          - "typescript-operations"
          - "typescript-react-apollo"
        config:
          withHooks: true
    ```

3.  **添加 `package.json` 脚本**:

    ```json
    "scripts": {
      "codegen": "graphql-codegen --config codegen.yml"
    }
    ```

4.  **运行 `npm run codegen`**：
    这将生成 `src/generated/graphql.ts` 文件，其中包含了所有类型定义和 `useQuery` Hooks。

完成以上步骤后，您的 Next.js 项目就已经为使用 Apollo Client 和 Ant Design 搭建管理后台做好了准备。接下来，您可以开始创建页面，并使用自动生成的 Hooks 来获取和展示数据。