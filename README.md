# clipboard_presenter_plugin

The clipboard_presenter_plugin is a plugin for
[rx/presenters](https://github.com/rx/presenters) which provides clipboard
interaction.

## Actions

The clipboard_presenter_plugin provides the following actions:

* Copy from an element: `clipboard copy: :some_field`
* Cut from an element: `clipboard cut: :some_field`

## Usage

Include the clipboard_presenter_plugin either globally via the `plugins`
configuration setting

```ruby
# config/initializers/presenters.rb
Voom::Presenters::Settings.configure do |config|
  config.presenters.plugins << :clipboard
  # Now `clipboard` is available in every POM!
end
```

or on a per-POM basis via the `plugin` method.

```ruby
# presenters/foos/view.pom
Voom::Presenters.define(:view, namespace: :foos) do
  plugin :clipboard

  # ...
end
```

Then, use one of the clipboard actions in an event handler.

```ruby
text_field id: :my_secret_token do
  value current_user.super_secret_token
end

button icon: :file_copy do
  tooltip 'Copy token'

  event :click do
    clipboard copy: :my_secret_token
    snackbar 'Copied token to clipboard!'
  end
end
```

## Browser support

The following browsers are considered officially supported:

* Chrome 42+
* Edge 12+
* Firefox 41+
* Safari 10+

## Building

0. `nvm use && npm i`
1. `npm run type-check`
2. Compile TS to JS: `npm run build` (output: `views/clipboard/build`)
3. Transpile and bundle via Babel and Webpack: `npm run bundle:dev` (output:
   `dist/bundle.js`)

Or, `npm run watch` to watch `views/clipboard/src` for changes and run steps 1-3 above.

## Contributing

1. Fork it
2. Branch it
4. Fix it
4. PR it
5. Done!
