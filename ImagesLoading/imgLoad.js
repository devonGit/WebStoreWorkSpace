/**
 * Created by devendra.kumar on 09-02-2016.
 */

var $container = $('#image-container');
var $status = $('#status');
var $progress = $('progress');

var supportsProgress = $progress[0] &&
        // IE does not support progress
    $progress[0].toString().indexOf('Unknown') === -1;

var loadedImageCount, imageCount;
$(document).ready(function(){
    $('#add').click( function() {
        console.log('Hit the server....')
        // add new images
        var items = getItems();
        $container.prepend( $(items) );
        // use ImagesLoaded
        $container.imagesLoaded()
            .progress( onProgress )
            .always( onAlways );
        // reset progress counter
        imageCount = $container.find('img').length;
        resetProgress();
        updateProgress( 0 );
    });
});

// reset container
$('#reset').click( function() {
    $container.empty();
});

// -----  ----- //

// return doc fragment with
function getItems() {
    var items = '';
    for ( var i = 0; i < 7; i++ ) {
        items += getImageItem();
    }
    return items;
}

// return an <li> with a <img> in it
function getImageItem() {
    var item = '<li class="is-loading">';
    var size = Math.random() * 3 + 1;
    var width = Math.random() * 110 + 100;
    width = Math.round( width * size );
    var height = Math.round( 140 * size );
    var rando = Math.ceil( Math.random() * 1000 );
    // 10% chance of broken image src
    // random parameter to prevent cached images
    var src = rando < 100 ? '//foo/broken-' + rando + '.jpg' :
        // use lorempixel for great random images
    '//lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
    item += '<img src="' + src + '" /></li>';
    console.log('The Src is -'+item)
    return item;
}

// -----  ----- //

function resetProgress() {
    $status.css({ opacity: 1 });
    loadedImageCount = 0;
    if ( supportsProgress ) {
        $progress.attr( 'max', imageCount );
    }
}

function updateProgress( value ) {
    if ( supportsProgress ) {
        $progress.attr( 'value', value );
    } else {
        // if you don't support progress elem
        $status.text( value + ' / ' + imageCount );
    }
}

// triggered after each item is loaded
function onProgress( imgLoad, image ) {
    // change class if the image is loaded or broken
    var $item = $( image.img ).parent();
    $item.removeClass('is-loading');
    if ( !image.isLoaded ) {
        $item.addClass('is-broken');
    }
    // update progress element
    loadedImageCount++;
    updateProgress( loadedImageCount );
}

// hide status when done
function onAlways() {
    $status.css({ opacity: 0 });
}

