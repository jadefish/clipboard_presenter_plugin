(function() {
  function requestPermission(name) {
    return navigator.permissions.query({name: name});
  }

  function copy(element) {
    return requestPermission('clipboard-write').then(function(result) {
      if (!(result.state == 'granted' || result.state == 'prompt')) {
        throw new Error('clipboard access denied');
      }

      var text = element.vComponent.value();

      return navigator.clipboard.writeText(text).then(function() {
        return true;
      }).catch(function() {
        throw new Error('Unable to write to clipboard');
      });
    })
  }

  function cut(element) {
    return requestPermission('clipboard-write').then(function(result) {
      if ((!result.state == 'granted' || result.state == 'prompt')) {
        throw new Error('clipboard access denied');
      }

      var text = element.vComponent.value();

      return navigator.clipboard.writeText(text).then(function() {
        element.vComponent.setValue(null);

        return true;
      }).catch(function() {
        throw new Error('Unable to write to clipboard');
      })
    });
  }

  function paste(element) {
    return requestPermission('clipboard-read').then(function(result) {
      if ((!result.state == 'granted' || result.state == 'prompt')) {
        throw new Error('clipboard access denied');
      }

      return navigator.clipboard.readText().then(function(text) {
        element.vComponent.setValue(text);

        return true;
      }).catch(function() {
        throw new Error('Unable to read from clipboard');
      })
    });
  }

  var actionsMap = {
    copy: copy,
    cut: cut,
    paste: paste
  };

  window.clipboard = function clipboard(options, params, _event, results) {
    var action = actionsMap[options.action];
    var element = document.querySelector('#' + options.element);

    if (!element) {
      throw new Error('No element found matching selector #' + element)
    }

    return new Promise(function(resolve, reject) {
      return action(element).then(function(result) {
        results.push({
          action: 'clipboard',
          content: true,
          statusCode: 200
        });

        resolve(results);
      }).catch(function(error) {
        results.push({
          action: 'clipboard',
          contentType: 'v/errors',
          content: {exception: error.message},
          statusCode: 500
        });

        reject(results);
      });
    });
  };
})();
