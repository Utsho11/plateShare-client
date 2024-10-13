
# PLATESHARE

It's a frontend and backend project. It's a recipe sharing platform.

## Project Name:

PLATESHARE

## Live URL:

- [PLATESHARE Client](https://plate-share.vercel.app/)

- [PLATESHARE Server](https://plate-share-server.vercel.app/)

## Features:

- **Create Admin and User.**

- **User can post,update,delete recipe.** 

- **User can update profile.**

- **Admin can manage posts and user.**

- **Filter and Pagination System.**

- **Authentication and Authorization.**
  
- **Buy Subscription**


## Technology Used

- **Redux Toolkit**: A streamlined toolset for efficient Redux development, offering simplified state management, reducers, and middleware configuration.

- **Tailwind CSS**: A utility-first CSS framework enabling rapid UI development with pre-designed classes for styling directly in HTML.

- **Next Js**: A popular JavaScript library for building dynamic user interfaces, known for its component-based architecture and efficient DOM updates with a virtual DOM.

- **shadcn/ui**: A modern and flexible React component library built with Tailwind CSS, providing pre-designed and customizable UI components for rapid development.

- **cookie-parser**: Middleware for handling cookies in Express.js applications, allowing easy parsing and manipulation of cookies.

- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js, allowing your server to accept requests from different origins.

- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, facilitating the configuration of environment-specific variables.

- **express**: A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs.

- **http-status**: A utility to interact with HTTP status codes, providing constants and descriptions for standard HTTP status codes.

- **ts-node-dev**: A development tool that combines `ts-node` with `nodemon`, enabling automatic restarts and TypeScript compilation for faster development cycles.

- **typescript**: A strongly typed programming language that builds on JavaScript, adding static type definitions to help catch errors early in the development process.

- **MongoDB**: NoSQL database.

- **Swiper.js**: It's popular library for creating slider.

- **Antd**: It's ui component library.

## Installation

To set up the project locally, follow these steps:

**1. Clone the repository**:

- Clone repository for `Client`:

```bash
git clone https://github.com/Utsho11/plateShare-client.git
```
- Clone repository for `Server`:

```bash
git clone https://github.com/Utsho11/plateShare-server.git
```

**2. Go to the project directory:**

Please change my-project with the main directory here. 

```bash
cd my-project
```
 

**3. Install dependencies**:

Open your terminal and run these commands to set npm.

```bash
1. npm init -y
    
2. npm install
```

**4. Set up environment variables**:

Create a `.env` file in the root of the project and add the following variables:

- **For Client:**

- FRONTEND
- 
Create an `.env.local` file at the same level of `package.json` file.

```bash
NEXT_PUBLIC_BASE_API
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_EMAIL
```
- BACKEND

Create an `.env` file at the same level of `package.json` file.

```bash
NODE_ENV
PORT
DATABASE_URL
BCRYPT_SALT_ROUNDS
DEFAULT_PASS
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
JWT_ACCESS_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN
SUPER_ADMIN_PASSWORD
STORE_ID
SIGNATURE_KEY
PAYMENT_URL
VERIFY_PAYMENT_URL
```

**5. Run the application**:

You can run both client and server by following this command.

```bash
npm run dev
```
