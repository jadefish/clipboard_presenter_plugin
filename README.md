# clipboard_presenter_plugin

A plugin for [voom/presenters](https://github.com/rx/presenters) which
provides clipboard interaction via the
[clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

## Actions

The clipboard_presenter_plugin provides the following actions:

* Copy from an element: `clipboard copy: :some_field`
* Cut from a mutable element: `clipboard cut: :another_field`
* Paste into a mutable element: `clipboard paste: :receiving_field`

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

Currently, the clipboard Presenters plugin only supports Chrome. :(
