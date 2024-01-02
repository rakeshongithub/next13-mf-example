# Next 13 Module Federation Example

This repository presents a practical example of how a micro application can be integrated within another Next.js 13 application. It showcases two variations of Next.js applications: one utilizing page-based routing and the other employing app-based routing.

The primary objective of this demonstration is to highlight the potential issues encountered with app-based routing and module federation.


### App 1. Remote App - Custom React App
This is a micro application designed to be utilized by the host application.

To execute this application, use the following command: `npm run dev --workspace @next13-mf-example/custom-react-app`

### App 2. Host App - Next 13 with App Dir
This is the host application that uses Next.js 13 and app-based routing.

To execute this application, use the following command: `npm run dev --workspace @next13-mf-example/next13-with-app-dir`

### App 3. Host App - Next 13 with Page Dir
This is the host application that uses Next.js 13 and page-based routing.

To execute this application, use the following command: `npm run dev --workspace @next13-mf-example/next13-with-pages-dir`