# kn-website
Knowing Nature podcast website


## Checking broken links

This will create a file called `broken-links.csv` in the repository root,
overwriting it if it already exists.

1. Make sure the Hugo HTTP server is running:
    ```
    npm run dev
    ```

2. Run the link checker script:
    ```
    npm run check:links
    ```
