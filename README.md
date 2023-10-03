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

## Checking spelling

1. Run the spell checker script:
    ```
    npm run check:spelling
    ```

2. Fix any errors found

3. If the spell checker flags correctly-spelled words, you can add them to the bottom of the `/dictionary.txt` file to "learn" them for the future.
