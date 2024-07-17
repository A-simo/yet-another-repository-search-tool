# Yet another repository search tool

This web application represents the tool to search packages like https://bower.io/search/
Features:
- Fetching repositories by repository name. Sorting is implemented on client, because used libraries.io API doesn't provide sorting by name and owner. Owner is extracted from `repository_url`, because this property is not provided by API.
- Pagination is implemented on the client. Although the library.io API provides the ability to pass parameters `page` and `per_page` for pagination, there is no way to get the total number of results found. Therefore, it was decided to implement pagination on the client. This will also avoid additional requests and waiting.
- The database query is implemented with debouncing to avoid redundant database queries.
- An abort control is implemented to abort the previous request if the request is changed or if the request is canceled via the input clearing or pressing the Esc button.


## How to use this repo:

1. You can run project locally. Please make sure to use you `API_KEY` for https://libraries.io/ in file: `yet-another-repository-search-tool/src/constants.ts`. After that run this command:

```
yarn start
```

A browser will show up and display the web app.

2. To run tests for the web app run this command:

```
yarn test
```