$('li').click(function() {
    var $this = $(this);
    $this.insertAfter($this.siblings(':eq(0)'));
});