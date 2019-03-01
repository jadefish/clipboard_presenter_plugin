require_relative 'clipboard/action'

module Voom
  module Presenters
    module Plugins
      module Clipboard
        module DSLEventActions
          def clipboard(action, **attributes, &block)
            self << Clipboard::Action.new(action: action, parent: self, **attributes, &block)
          end
        end

        module WebClientComponents
          def render_header_clipboard(_pom, render:)
            view_dir = File.join(__dir__, 'clipboard')
            render.call :erb, :clipboard_header, views: view_dir
          end
        end

        module WebClientActions
          def action_data_clipboard(action, parent_id, *)
            options = action.options.to_h.merge(
              __parent_id__: parent_id,
              action: action.action,
              element: action.element
            )

            # Type, URL, Options, Params (passed into javascript event/action classes)
            [action.type, nil, options, action.attributes.to_h]
          end
        end
      end
    end
  end
end
