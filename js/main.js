(function() {
  var configObject = {
    settings: {
      size: 7
    },

    draggedElementId: null,

    init: function() {
      var size = this.settings.size;
      var container = document.createElement('ul');
      container.classList.add('container');
      document.body.insertBefore(container,document.body.firstChild);
      for (i=0; i < size;  i++) {
        var item = document.createElement('li');
        item.setAttribute('draggable','true');
        item.id = 'item-' + i;
        item.classList.add('item');
        item.innerHTML = 'Element ' + i;
        container.appendChild(item);
      }
    },

    addListeners: function() {
      var cols = document.getElementsByClassName('item');
      for (var i = 0; i < cols.length; ++i) {
        var col = cols[i];
        col.addEventListener('dragstart',this.dragStart);
        col.addEventListener('dragover',this.dragOver);
        col.addEventListener('dragenter',this.dragEnter);
        col.addEventListener('dragleave',this.dragLeave);
        col.addEventListener('dragend',this.dragEnd);
        col.addEventListener('drop',this.drop);
      }
    },

    dragStart: function(e) {
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', this.id);
      draggedElementId = this.id;
    },

    dragOver: function(e) {
      var target = this.id;

      if (target != draggedElementId) {
        target = document.getElementById(target);
        var dragged = document.getElementById(draggedElementId);
        var draggedIndex = getIndex(dragged);
        var targetIndex = getIndex(target);
        if (draggedIndex < targetIndex) {
          insertAfter(dragged,target);
        } else {
          insertBefore(dragged,target);
        }
      }
      e.dataTransfer.dropEffect = 'move';

      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    },

    dragEnter: function(e) {
      this.classList.add('over');
    },

    dragLeave: function(e) {
      this.classList.remove('over');
    },

    dragEnd: function(e) {
      this.classList.remove('dragging');
      this.classList.remove('over');
    },

    drop: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }//drop
  }//configObject

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
  }

  function removeElement(el) {
    el.parentElement.removeChild(el);
  }

  function getIndex(el) {
    var parent = el.parentNode;
    var next = parent.firstChild;
    for (var i=0; i < parent.childNodes.length; i++) {
      if (next === el) {
        return i;
      }
      next = next.nextSibling;
    }
  }

  configObject.init();
  configObject.addListeners();

})();