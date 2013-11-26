simple-bower-registry
=====================

A very simple registry server compatible with bower 1.x. Designed for those who want to host their own private registry.

###Usage

Install with `npm install -g simple-bower-registry`. Then you can run the server as `simple-bower-registry`.

The server runs on port 3333. By default the registry data is stored in a single file `./package-data.json`. You can specify a different file as a command-line paramater, e.g. `simple-bower-registry my-package-data.json`.

To use your server with bower, update (or create) a .bowerrc file either in your home directory or in the directory for the package you are working on that needs the private registry. Create a key of `registry` and set it to the URL of the registry server, e.g.

```json
{
  "registry": "http://localhost:3333"
}
```

###Differences from the live bower registry

- If you make a mistake when registering a package, you can just submit it again and it will overwrite the existing one.
- You can use any valid endpoint, not just `git://` URLs.
- There is no database to manage. The data is kept in memory and persisted to a plain JSON file.
