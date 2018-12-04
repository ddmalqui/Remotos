/**********

  This Pen uses no libraries except fonts and should 
  work on all modern browsers
  
  The answers are stored in the `questions` array
  with the key `answer`. 
  
  inspired by XavierCoulombeM
  https://dribbble.com/shots/2510592-Simple-register-form
  
 **********/


var config = {
                    apiKey: "AIzaSyARAFMvH10iF_w_fn3tMYWxDrhFw_vKWcQ",
                    authDomain: "infousuarios-d3305.firebaseapp.com",
                    databaseURL: "https://infousuarios-d3305.firebaseio.com",
                    projectId: "infousuarios-d3305",
                    storageBucket: "",
                    messagingSenderId: "195980824134"
                  };
        firebase.initializeApp(config);

var questions = [
  {question:"¿Cual es su nombre?"},
  {question:"Numero de Telefono (Ejemplo: 3425123123)", type: "number"},
  {question:"¿Como podemos ayudarlo?", list: "opciones", type:''}
  ]

/*
  do something after the questions have been answered
*/
var onComplete = function() {

    var h1 = document.createElement('h1')

    h1.appendChild(document.createTextNode('Gracias ' + questions[0].answer ))
    setTimeout(function() {
      register.parentElement.appendChild(h1)
      setTimeout(function() { h1.style.opacity = 1 }, 50)
    }, 1000)

    var entry = {};
                    entry.title = questions[0].answer;
                    console.log(questions[2].answer);
                    switch(questions[2].answer) {
                        case 'Me gustaría recibir novedades esporádicamente':
                            //Nombre, gracias por confiar en *Kol Accesorios*. Constantemente nos ingresa mercadería, no dejes de agendarnos, así podemos comentarle lo mas relevante todas las semanas.
                            entry.content = 'https://api.whatsapp.com/send?phone=549'+questions[1].answer+'&text='+questions[0].answer+',%20gracias%20por%20confiar%20en%20*Kol%20Accesorios*.%20Constantemente%20nos%20ingresa%20mercadería,%20no%20dejes%20de%20agendarnos,%20así%20podemos%20comentarle%20lo%20mas%20relevante%20todas%20las%20semanas.?&source=&data=';
                            break;
                        case 'Quiero mi funda personalizada!!':
                            //Nombre, gracias por confiar en *Kol Accesorios*. Nos encantaría poder hacer tú funda con la imagen que más te guste. Por favor compartinos la foto por este medio y el modelo de celular.
                            entry.content = 'https://api.whatsapp.com/send?phone=549'+questions[1].answer+'&text='+questions[0].answer+',%20gracias%20por%20confiar%20en%20*Kol%20Accesorios*.%20Nos%20encantaría%20poder%20hacer%20tú%20funda%20con%20la%20imagen%20que%20más%20te%20guste.%20Por%20favor%20compartinos%20la%20foto%20por%20este%20medio%20y%20el%20modelo%20de%20celular.%20?&source=&data=';
                            break;
                        case 'Estoy buscando un producto puntual':
                            //gracias por confiar en *Kol Accesorios*. Comentenos por favor, que producto esta buscando?. 
                            entry.content = 'https://api.whatsapp.com/send?phone=549'+questions[1].answer+'&text='+questions[0].answer+',%20gracias%20por%20confiar%20en%20*Kol%20Accesorios*.%20Comentenos%20por%20favor,%20que%20producto%20esta%20buscando?.%20?&source=&data=';
                            break;
                        case 'Quiero dejar un comentario':
                        //Nombre, gracias por confiar en *Kol Accesorios*. Por este medio puede dejarnos el comentario que desee. 
                            entry.content = 'https://api.whatsapp.com/send?phone=549'+questions[1].answer+'&text='+questions[0].answer+',%20gracias%20por%20confiar%20en%20*Kol%20Accesorios*.%20Por%20este%20medio%20puede%20dejarnos%20el%20comentario%20que%20desee.%20&source=&data=';
                            break;
                        default:
                        //, gracias por confiar en *Kol Accesorios*. ¿En que podemos ayudarlo?
                            entry.content = 'https://api.whatsapp.com/send?phone=549'+questions[1].answer+'&text='+questions[0].answer+',%20gracias%20por%20confiar%20en%20*Kol%20Accesorios*.%20¿En%20que%20podemos%20ayudarlo?&source=&data=';
                    }
                    entry.createdAt = new Date().getTime();
                    entry.updatedAt = entry.createdAt;
                    entry.views = 0;
                    
                    var Entry = firebase.database().ref('Entry');
                    
                    Entry.push(entry).then(function(data){
                       // window.location.href = 'entry.html?id='+data.getKey()
                    }).catch(function(error){
                        alert(error);
                        console.error(error);
                    })

}

;(function(questions, onComplete) {

    var tTime = 100 // transition transform time from #register in ms
    var wTime = 200 // transition width time from #register in ms
    var eTime = 1000 // transition width time from inputLabel in ms

    // init
    // --------------
    if (questions.length == 0) return

    var position = 0

    putQuestion()

    forwardButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e) {
        transform(0, 0) // ie hack to redraw
        if (e.keyCode == 13) validate()
    })

    previousButton.addEventListener('click', function(e) {
        if (position === 0) return
        position -= 1
        hideCurrent(putQuestion)
    })


    // functions
    // --------------

    // load the next question
    function putQuestion() {
        console.log(questions[position].list);
        inputLabel.innerHTML = questions[position].question
        inputField.type = questions[position].type || 'text'
        inputField.value = questions[position].answer || ''
        if (typeof questions[position].list != 'undefined'){

            var y = document.createElement("DATALIST");
            y.setAttribute("id", "opciones");
            document.getElementById("inputContainer").appendChild(y);

            var a = document.createElement("OPTION");
            a.setAttribute("value", "Me gustaría recibir novedades esporádicamente");
            document.getElementById("opciones").appendChild(a);
            var b = document.createElement("OPTION");
            b.setAttribute("value", "Quiero mi funda personalizada!!");
            document.getElementById("opciones").appendChild(b);
            var c = document.createElement("OPTION");
            c.setAttribute("value", "Estoy buscando un producto puntual");
            document.getElementById("opciones").appendChild(c);
            var c = document.createElement("OPTION");
            c.setAttribute("value", "Quiero dejar un comentario");
            document.getElementById("opciones").appendChild(c);
        }

        inputField.focus()



        // set the progress of the background
        progress.style.width = position * 100 / questions.length + '%'

        previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'

        showCurrent()

    }

    // when submitting the current question
    function validate() {

        var validateCore = function() {      
          return inputField.value.match(questions[position].pattern || /.+/)
        }

        if (!questions[position].validate) questions[position].validate = validateCore

        // check if the pattern matches
        if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
        else ok(function() {

            // execute the custom end function or the default value set
            if (questions[position].done) questions[position].done()
            else questions[position].answer = inputField.value

            ++position

            // if there is a new question, hide current and load next
            if (questions[position]) hideCurrent(putQuestion)
            else hideCurrent(function() {
                // remove the box if there is no next question
                register.className = 'close'
                progress.style.width = '100%'

                onComplete()
              
            })

        })

    }


    // helper
    // --------------

    function hideCurrent(callback) {
        inputContainer.style.opacity = 0
        inputLabel.style.marginLeft = 0
        inputProgress.style.width = 0
        inputProgress.style.transition = 'none'
        inputContainer.style.border = null
        setTimeout(callback, wTime)
    }

    function showCurrent(callback) {
        inputContainer.style.opacity = 1
        inputProgress.style.transition = ''
        inputProgress.style.width = '100%'
        setTimeout(callback, wTime)
    }

    function transform(x, y) {
        register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }

    function ok(callback) {
        register.className = ''
        setTimeout(transform, tTime * 0, 0, 10)
        setTimeout(transform, tTime * 1, 0, 0)
        setTimeout(callback, tTime * 2)
    }

    function wrong(callback) {
        register.className = 'wrong'
        for (var i = 0; i < 6; i++) // shaking motion
            setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
        setTimeout(transform, tTime * 6, 0, 0)
        setTimeout(callback, tTime * 7)
    }

}(questions, onComplete))