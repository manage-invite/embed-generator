'use strict'

$(document).ready(function () {
    const converter = new showdown.Converter()

    let fields = 1

    const defaultEmbed = {
        title: '',
        author: {
            name: '',
            url: '',
            icon_url: ''
        },
        description: '',
        url: '',
        thumbnail: {
            url: ''
        },
        color: '',
        fields: [{}],
        footer: {
            text: ''
        }
    };
    let embed = Object.assign({}, defaultEmbed);

    function resetEmbed () {
        $('.embed-inner').html('')
        $('.embed-footer').remove()
        $('.embed-thumb').remove()
    }

    function updateEmbed (embed) {
        resetEmbed()

        if (embed.url) {
            $('.embed-inner').append('<div class="embed-title"><a href="' + embed.url + '">' + embed.title + '</a></div>')
        } else if (embed.title.length !== 0) {
            $('.embed-inner').append('<div class="embed-title">' + embed.title + '</div>')
        }

        if (embed.description) {
            $('.embed-inner').append('<div class="embed-description">' + converter.makeHtml(embed.description) + '</div>')
        }

        if (embed.color) {
            $('.side-colored').css('background-color', embed.color)
        }

        if (embed.author && embed.author.name) {
            const content = '<div class="embed-author"><a class="embed-author-name" href="' + (embed.author ? embed.author.url : null) + '">' + embed.author.name + '</a></div>'
            const titleExists = document.getElementsByClassName('embed-title').length > 0
            if (titleExists) $('.embed-title').before(content)
            else $('.embed-inner').append(content)
        }

        if (embed.author && embed.author.icon_url) {
            $('.embed-author-name').before('<img class="embed-author-icon" src="' + embed.author.icon_url + '" />')
        }

        if (embed.thumbnail.url) {
            // add thumbnail
            $('.card.embed .card-block').append('<img class="embed-thumb" src="' + embed.thumbnail.url + '" />')
            $('.embed-thumb').height($('.embed-thumb')[0].naturalHeight)
        }

        if (embed.fields && embed.fields.length > 0) {
            $('.embed-inner').append('<div class="fields"></div>')
        }

        if (embed.fields) {
            embed.fields.filter((f) => f.name && f.value).forEach((field) => {
                $('.embed-inner .fields').append('\n        <div class="field ' + (field.inline && 'inline') + '">\n          <div class="field-name">' + field.name + '</div>\n          <div class="field-value">' + converter.makeHtml(field.value) + '</div>\n        </div>\n      ')
            })
        }

        if (embed.footer.text) {
            $('.card.embed').append('<div class="embed-footer"><span>' + embed.footer.text + '</span></div>')
        }

        // code
        $('.json-source').text(JSON.stringify(embed))
        hljs.highlightBlock($('.json-source')[0])
    }

    // run once on startup
    updateEmbed(embed)

    function generateInputFields (fields) {
        // generate inputs for fields
        $('.input-fields').html('')

        const _loop = (i) => {
            $('.input-fields').append('<div class="form-group row">\n        <div class="col-sm-4">\n          <input class="form-control" id="field-' + i + '-name" type="text" placeholder="name" value="' + (embed.fields[i].name !== undefined ? embed.fields[i].name : '') + '" />\n        </div>\n        <div class="col-sm-4">\n          <input class="form-control" id="field-' + i + '-value" type="text" placeholder="value" value="' + (embed.fields[i].value !== undefined ? embed.fields[i].value : '') + '" />\n        </div>\n        <div class="col-sm-2">\n          <div class="form-check">\n            <label class="form-check-label">\n              <input class="form-check-input" id="field-' + i + '-inline" type="checkbox" ' + (embed.fields[i].inline !== undefined ? 'checked="checked"' : '') + '> Inline\n            </label>\n          </div>\n        </div>\n        <div class="col-sm-2">\n          <button id="field-' + i + '-delete" class="btn btn-danger select">Delete</button>\n        </div>\n      </div>')
            $('#field-' + i + '-name').keyup(function () {
                updateFieldName(i, $('#field-' + i + '-name').val())
            })

            $('#field-' + i + '-value').keyup(function () {
                updateFieldValue(i, $('#field-' + i + '-value').val())
            })

            $('#field-' + i + '-inline').click(function () {
                updateFieldInline(i, $('#field-' + i + '-inline').is(':checked'))
            })

            $('#field-' + i + '-delete').click(function (e) {
                e.preventDefault()
                deleteField(i)
            })
        }

        for (let i = 0; i < fields; i++) {
            _loop(i)
        }

        $('.input-fields').append('<button id="add-field" class="btn btn-success select">Add field</button>')
        $('#add-field').click(function (e) {
            e.preventDefault()
            addField()
        })
    }

    generateInputFields(fields)

    function copySource () {
        const secondsElement = document.querySelector('#copy-input')
        secondsElement.setAttribute('type', 'text')
        secondsElement.setAttribute('value', JSON.stringify(embed))
        secondsElement.select()
        document.execCommand('copy')
        secondsElement.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
    }

    function updateFieldName (index, value) {
        embed.fields[index].name = value
        updateEmbed(embed)
    }

    function updateFieldValue (index, value) {
        embed.fields[index].value = value
        updateEmbed(embed)
    }

    function updateFieldInline (index, value) {
        embed.fields[index].inline = value
        updateEmbed(embed)
    }

    function deleteField (index) {
        embed.fields.splice(index, 1)
        updateEmbed(embed)
        fields -= 1
        generateInputFields(fields)
    }

    function addField () {
        embed.fields.push({ inline: true })
        fields += 1
        generateInputFields(fields)
    }

    function updateTitle (value) {
        embed.title = value || ''
        updateEmbed(embed)
    }

    function updateUrl (value) {
        embed.url = value || ''
        updateEmbed(embed)
    }

    function updateThumb (value) {
        embed.thumbnail.url = value || false
        updateEmbed(embed)
    }

    function updateDescription (value) {
        embed.description = value || ''
        updateEmbed(embed)
    }

    function updateColor (value) {
        embed.color = value || false
        updateEmbed(embed)
    }

    function updateAuthorName (value) {
        embed.author.name = value || ''
        updateEmbed(embed)
    }

    function updateAuthorUrl (value) {
        embed.author.url = value || ''
        updateEmbed(embed)
    }

    function updateAuthorIcon (value) {
        embed.author.icon_url = value || ''
        updateEmbed(embed)
    }

    function updateFooter (value) {
        embed.footer.text = value || ''
        updateEmbed(embed)
    }

    $('#form').submit(function (e) {
        e.preventDefault()
    })

    // checking helpers
    function addWarning (item, type, message) {
        item.addClass('form-control-warning')
        item.removeClass('form-control-success')
        item.parent().addClass('has-warning')
        item.parent().removeClass('has-success')
        if ($('#' + type + '-feedback').length === 0) {
            item.after('<div class="form-control-feedback" id="' + type + '-feedback">' + message + '</div>')
        }
    }

    function addSuccess (item, type) {
        item.removeClass('form-control-warning')
        item.addClass('form-control-success')
        item.parent().addClass('has-success')
        item.parent().removeClass('has-warning')
        $('#' + type + '-feedback').remove()
    }

    $('#select-edit').click(function (e) {
        document.getElementById('edit-input').style.visibility = 'visible'
    })

    $('#edit-input').keyup(function () {
        const value = document.getElementById('edit-input').value
        try {
            const keysToUpdate = Object.keys(embed);
            const newEmbed = JSON.parse(value);
            keysToUpdate.forEach((key) => {
                if (newEmbed[key]) embed[key] = newEmbed[key];
                else embed[key] = defaultEmbed[key];
            });
            updateEmbed(embed)
            fields = embed.fields ? embed.fields.length : 0;
            generateInputFields(fields);
            $('#title').get(0).value = embed.title || null
            $('#url').get(0).value = embed.url || null
            $('#icon').get(0).value = embed.thumbnail.url || null
            $('#author_icon').get(0).value = (embed.author ? embed.author.icon_url : null) || null
            $('#author_name').get(0).value = (embed.author ? embed.author.name : null) || null
            $('#author_url').get(0).value = (embed.author ? embed.author.url : null) || null
            $('#description').get(0).value = embed.description || null
            $('#color').get(0).value = embed.color || null
            $('#footer').get(0).value = embed.footer.text || null
        } catch (e) {
        }
    })

    $('#copy-source').click(function (e) {
        e.preventDefault()
        copySource()
    })

    $('#title').keyup(function () {
        const item = $('#title')
        const title = item.val()

        // update
        updateTitle(title)
    })

    $('#url').keyup(function () {
        const item = $('#url')
        const url = item.val()

        if (url.substr(0, 4) !== 'http' && url.length !== 0 && !url.startsWith('{')) {
            addWarning(item, 'url', 'not a valid url or a valid variable')
        } else {
            addSuccess(item, 'url')
            // update
            updateUrl(url)
        }
    })

    $('#icon').keyup(function () {
        const item = $('#icon')
        const icon = item.val()

        if (icon.substr(0, 4) !== 'http' && icon.length !== 0 && !icon.startsWith('{')) {
            addWarning(item, 'icon', 'not a valid url or a valid variable')
        } else {
            addSuccess(item, 'icon')
            // update
            updateThumb(icon)
        }
    })

    $('#description').keyup(function () {
        const item = $('#description')
        const description = item.val()
        addSuccess(item, 'description')
        // update
        updateDescription(description)
    })

    $('#color').change(function () {
        updateColor($('#color').val())
    })

    $('#author_name').keyup(function () {
        const item = $('#author_name')
        const authorName = item.val()

        addSuccess(item, 'author_name')
        // update
        updateAuthorName(authorName)
    })

    $('#author_url').keyup(function () {
        const item = $('#author_url')
        const authorURL = item.val()

        if (authorURL.substr(0, 4) !== 'http' && authorURL.length !== 0 && !authorURL.startsWith('{')) {
            addWarning(item, 'author_url', 'not a valid url or a valid variable')
        } else {
            addSuccess(item, 'author_url')
            // update
            updateAuthorUrl(authorURL)
        }
    })

    $('#author_icon').keyup(function () {
        const item = $('#author_icon')
        const authorIcon = item.val()

        if (authorIcon.substr(0, 4) !== 'http' && authorIcon.length !== 0 && !authorIcon.startsWith('{')) {
            addWarning(item, 'author_icon', 'not a valid url or a valid variable')
        } else {
            addSuccess(item, 'author_icon')
            // update
            updateAuthorIcon(authorIcon)
        }
    })

    $('#footer').keyup(function () {
        const item = $('#footer')
        const footer = item.val()

        addSuccess(item, 'footer')
        // update
        updateFooter(footer)
    })
})
