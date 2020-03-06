var currentQuestion = 1;
var countQuestions = 1;
var answersList = '';
var opros = [];

function getMostFrequentElement(inputArg) {
    var type = typeof inputArg,
        length,
        mostFrequent,
        counts,
        index,
        value;

    if (inputArg === null || type === 'undefined') {
        throw TypeError('inputArg was "null" or "undefined"');
    }

    mostFrequent = [];
    if (type === 'function' || !Object.prototype.hasOwnProperty.call(inputArg, 'length')) {
        mostFrequent[0] = inputArg;
        mostFrequent[1] = 1;
    } else {
        counts = {};
        length = inputArg.length;
        for (index = 0; index < length; index += 1) {
            value = inputArg[index];
            type = typeof value;
            counts[type] = counts[type] || {};
            counts[type][value] = (counts[type][value] || 0) + 1;
            if (!mostFrequent.length || counts[type][value] >= mostFrequent[1]) {
                mostFrequent[0] = value;
                mostFrequent[1] = counts[type][value];
            }
        }
    }

    return mostFrequent;
}


$.getJSON('test.json', function(data) {
    opros = data.test;
    countQuestions = opros.length;

    $('.test__total').html(countQuestions);

    $('.test__current').html(currentQuestion);

    var $html = '';

    $html += '<div class="test__question">'+opros[0].quest+'</div>';
    $html += '<div class="test__variants">';
    $.each(opros[0].answers, function( index, value ) {
        $html += '<label class="radio test__variant"><input type="radio" name="variant" value="'+value.value+'"><span class="radio__checkbox"></span><span class="test__answer">'+value.text+'</span></label>';
    });
    $html += '</div>';

    $('.test__main').html($html);
});

function nextQuest(opros, currentQuestion){

    $('.test__current').html(currentQuestion);

    var $html = '';

    $html += '<div class="test__question">'+opros[currentQuestion-1].quest+'</div>';
    $html += '<div class="test__variants">';
    $.each(opros[currentQuestion-1].answers, function( index, value ) {
        $html += '<label class="radio test__variant"><input type="radio" name="variant" value="'+value.value+'"><span class="radio__checkbox"></span><span class="test__answer">'+value.text+'</span></label>';
    });
    $html += '</div>';

    $('.test__main').html($html);
}


$('.js-next-question').click(function () {
    event.preventDefault();
    var answer = $('.test__test').find('input:checked').val();
    if (answer){
        answersList+= ','+answer;
        if (currentQuestion == countQuestions){
            var ansArray = answersList.substr(1).split(",");
            var mostAnsver = getMostFrequentElement(ansArray)[0];

            var resultTitle = 'Решительность';
            var resultItogo = 'Как и главная героиня фильма «Тихое место – 2», вы очень смелая! Вы умеете быстро принимать решения и, что еще важнее, претворять их в жизнь, какими бы сложными они ни казались. С вами ваши близкие как за каменной стеной, ведь вы не боитесь трудностей и готовы свернуть горы ради тех, кого вы любите. Точно так же поступает и Эвелин. В желании защитить своих детей она готова противостоять целому миру. Хотите поддержать ее? Тогда приходите на премьеру «Тихого места – 2» в кино 19 марта.'

            var $html = '<div class="test__results">';
            $html += '<div class="test__title">Ваша сильная сторона — <span>'+resultTitle+'</span></div>';
            $html += '<div class="test__itogo">'+resultItogo+'</div>';
            $html += '<div class="share test__share">\n' +
                '<div class="share__title">поделиться с друзьями</div>\n' +
                '<div class="share__socials">\n' +
                '<button data-share="tw" class="share__soc-link share__soc-link_tw"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></button>\n' +
                '<button data-share="ok" class="share__soc-link share__soc-link_ok"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="odnoklassniki" class="svg-inline--fa fa-odnoklassniki fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M275.1 334c-27.4 17.4-65.1 24.3-90 26.9l20.9 20.6 76.3 76.3c27.9 28.6-17.5 73.3-45.7 45.7-19.1-19.4-47.1-47.4-76.3-76.6L84 503.4c-28.2 27.5-73.6-17.6-45.4-45.7 19.4-19.4 47.1-47.4 76.3-76.3l20.6-20.6c-24.6-2.6-62.9-9.1-90.6-26.9-32.6-21-46.9-33.3-34.3-59 7.4-14.6 27.7-26.9 54.6-5.7 0 0 36.3 28.9 94.9 28.9s94.9-28.9 94.9-28.9c26.9-21.1 47.1-8.9 54.6 5.7 12.4 25.7-1.9 38-34.5 59.1zM30.3 129.7C30.3 58 88.6 0 160 0s129.7 58 129.7 129.7c0 71.4-58.3 129.4-129.7 129.4s-129.7-58-129.7-129.4zm66 0c0 35.1 28.6 63.7 63.7 63.7s63.7-28.6 63.7-63.7c0-35.4-28.6-64-63.7-64s-63.7 28.6-63.7 64z"></path></svg></button>\n' +
                '<button data-share="fb" class="share__soc-link share__soc-link_fb"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></button>\n' +
                '<button data-share="vk" class="share__soc-link share__soc-link_vk"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="vk" class="svg-inline--fa fa-vk fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z"></path></svg></button>\n' +
                '</div>\n' +
                '</div>';
            $html += '</div>';
            $('.test__inner').html($html);
        } else {
            currentQuestion++;
            nextQuest(opros, currentQuestion);
        }
    }
});




