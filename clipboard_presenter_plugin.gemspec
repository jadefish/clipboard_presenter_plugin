lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'voom/presenters/plugins/clipboard/version'

Gem::Specification.new do |spec|
  spec.name          = "clipboard_presenter_plugin"
  spec.version       = Voom::Presenters::Plugins::Clipboard::VERSION
  spec.authors       = ["Nick Miller"]
  spec.email         = ["nick@nmiller.info"]

  spec.summary       = %q{Interact with the clipboard.}
  spec.homepage      = 'http://github.com/jadefish/clipboard_presenter_plugin'
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.17.3"
  spec.add_development_dependency "rake", "~> 10.0"
end
