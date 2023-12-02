# Pruebas-JS-Ajax
Tarea Pruebas-JS-Ajax
***Testing Java Script y Ajax*** 

  

José Daniel Zapata Ancco / 20202230A 

  

*** 

  

Agregamos Jasmine a nuestro Gemfile: 

  

![image](https://github.com/Josezapat/CC3S2/assets/90808325/f5d4c4cf-a9b0-4cb8-8991-5226fc76374f) 

  

Revisando y leyendo el repositorio  https://jasmine.github.io/setup/ruby.html 

  

Pude insertar correctamente los comandos de esta manera: 

  

![image](https://github.com/Josezapat/CC3S2/assets/90808325/566f10f7-f3f4-4ca5-986d-14b007c5575a) 

  

Automáticamente se nos abre un servidor web http://localhost:8888 donde se visualiza esta interfaz gráfica: 

  

![image](https://github.com/Josezapat/CC3S2/assets/90808325/5891a6b8-ab16-47e6-95ad-7ae07adaba31) 

  

**Pregunta: ¿Cuáles son los problemas que se tiene cuando se debe probar Ajax?. Explica tu respuesta.** 

  

Probar código que involucra Ajax puede presentar varios desafíos. Tales como Asincronía, Dependencia de la red, Acceso cruzado (Cross-Origin Resource Sharing - CORS) y los Manejo de errores, ya que las solicitudes Ajax pueden fallar, ya sea por problemas de red, errores en el servidor u otros problemas imprevistos. 

  

**Pregunta: ¿Qué son los stubs, espias y fixture en Jasmine para realizar pruebas de Ajax?** 

  

Stubs (Burlones): Los stubs en Jasmine son funciones simuladas que reemplazan funciones reales durante las pruebas. En el contexto de pruebas Ajax, puedes usar stubs para simular llamadas Ajax y controlar su comportamiento.  

  

Espías (Spies): Los espías en Jasmine nos permiten observar el comportamiento de funciones durante las pruebas sin modificar su implementación real. Se puede usar espías para verificar si se llamó a funciones Ajax específicas, cuántas veces se llamaron y con qué argumentos. 

  

Fixtures: Los fixtures son datos de prueba que se utilizan para simular respuestas Ajax. En lugar de depender de una llamada Ajax real, podemos cargar datos de prueba directamente desde un archivo o estructura de datos. Esto permite pruebas más predecibles y controladas, sin depender de la red. 

  

  

  

Pregunta: Experimenta el siguiente código de especificaciones (specs) de Jasmine del camino feliz del código AJAX llamado movie_popup_spec.js. 

  

```java 

describe('MoviePopup', function() { 

  // Descripción del conjunto de pruebas para MoviePopup 

  describe('setup', function() { 

    // Subconjunto de pruebas para la configuración de MoviePopup 

    it('adds popup Div to the main page', function() { 

      // Expectativa: Verificar si el elemento con id 'movieInfo' existe en la página principal 

      expect($('#movieInfo')).toExist(); 

    }); 

  

    it('hides the popup Div', function() { 

      // Expectativa: Verificar si el elemento con id 'movieInfo' está oculto 

      expect($('#movieInfo')).toBeHidden(); 

    }); 

  }); 

  

  describe('clicking on movie link', function() { 

    // Subconjunto de pruebas para hacer clic en el enlace de la película 

    beforeEach(function() { loadFixtures('movie_row.html'); }); 

  

    it('calls the correct URL', function() { 

      // Expectativa: Espiar la función Ajax y verificar si se llamó con la URL correcta al hacer clic en el enlace 

      spyOn($, 'ajax'); 

      $('#movies a').trigger('click'); 

      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/movies/1'); 

    }); 

  

    describe('when a successful server call', function() { 

      // Subconjunto de pruebas para cuando la llamada al servidor es exitosa 

      beforeEach(function() { 

        // Configurar un objeto de respuesta HTML simulado y espiar la función Ajax para llamar a la función de éxito con la respuesta simulada 

        let htmlResponse = readFixtures('movie_info.html'); 

        spyOn($, 'ajax').and.callFake(function(ajaxArgs) {  

          ajaxArgs.success(htmlResponse, '200'); 

        }); 

        $('#movies a').trigger('click'); 

      }); 

  

      it('makes #movieInfo visible', function() { 

        // Expectativa: Verificar si el elemento con id 'movieInfo' es visible después de una llamada exitosa al servidor 

        expect($('#movieInfo')).toBeVisible(); 

      }); 

  

      it('places movie title in #movieInfo', function() { 

        // Expectativa: Verificar si el texto de #movieInfo contiene el título de la película 

        expect($('#movieInfo').text()).toContain('Casablanca'); 

      }); 

    }); 

  }); 

}); 

``` 

`describe('MoviePopup', function()`: Este bloque describe un conjunto de pruebas para la funcionalidad de MoviePopup. 

  

`describe('setup', function()`: Aquí, hay pruebas para la configuración inicial de MoviePopup, como agregar elementos al DOM y ocultarlos. 

  

`describe('clicking on movie link', function()`: Este bloque se centra en las pruebas relacionadas con hacer clic en un enlace de película. Usa beforeEach para cargar un conjunto de datos simulado antes de cada prueba en este bloque. 

  

`it('calls the correct URL', function()`: Aquí, se utiliza spyOn para espiar la función ajax y luego se verifica si se llamó con la URL correcta al hacer clic en el enlace. 

  

`describe('when a successful server call', function()`: Este bloque describe pruebas adicionales cuando la llamada al servidor es exitosa. Configura un objeto de respuesta simulada y espía la función ajax para simular una respuesta exitosa. 

  

`it('makes #movieInfo visible', function()`: Verifica si, después de una llamada exitosa al servidor, el elemento con id 'movieInfo' se hace visible. 

  

`it('places movie title in #movieInfo', function()`: Verifica si, después de una llamada exitosa al servidor, el texto de #movieInfo contiene el título de la película. 

  

```java 

it('calls correct URL', function() { 

      spyOn($, 'ajax'); 

      $('#movies a').trigger('click'); 

      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/movies/1'); 

    }); 

``` 

  

Pregunta:¿Qupe hacen las siguientes líneas del código anterior?. 

  

En esas líneas decódigo está especificando y ejecutando una prueba (spec) en Jasmine. 

  

Ejercicios 

  

1. Un inconveniente de la herencia de prototipos es que todos los atributos (propiedades) de los objetos son públicos. (Recuerda que en Ruby, ningún atributo era público). Sin embargo, podemos aprovechar las clausuras para obtener atributos privados. Crea un sencillo constructor para los objetos User que acepte un nombre de usuario y una contraseña, y proporciona un método checkPassword que indique si la contraseña proporcionada es correcta, pero que deniegue la inspección de la contraseña en sí. Esta expresión de sólo métodos de acceso se usa ampliamente en jQuery. 

  

Creamos el Constructor y Método checkPassword: 

```java 

function User(username, password) { 

    // Atributos privados usando clausuras 

    let _username = username; 

    let _password = password; 

  

    // Método público para verificar la contraseña 

    this.checkPassword = function(inputPassword) { 

        return _password === inputPassword; 

    }; 

} 

  

// Ejemplo de uso 

let user = new User("exampleUser", "password123"); 

console.log(user.checkPassword("password123")); // Devolverá true 

console.log(user._password); // Devolverá undefined (no accesible) 

``` 

  

creamos un constructor User que acepta un nombre de usuario y una contraseña. Los atributos _username y _password son privados gracias a las clausuras. El método checkPassword es público y se puede utilizar para verificar la contraseña. 

  

2.SupongaMOS que no puede modificar el código del servidor para añadir la clase CSS adult a las filas de la tabla movies. ¿Cómo identificaría las filas que están ocultas utilizando sólo código JavaScript del lado cliente? 

  

Supongamos que las filas ocultas tienen una clase CSS hidden. Podemos identificarlas así: 

  

```java 

// Identificar filas ocultas 

let hiddenRows = document.querySelectorAll('.hidden'); 

  

// Iterar sobre las filas ocultas 

hiddenRows.forEach(row => { 

    // Realizar operaciones con cada fila oculta 

    console.log(row.textContent); 

}); 

``` 

  

Este código utiliza document.querySelectorAll para seleccionar todas las filas con la clase hidden y luego itera sobre ellas. 

  

3. Escribe el código AJAX necesario para crear menús en cascada basados en una asociación has_many. Esto es, dados los modelos de Rails A y B, donde A has_many (tiene muchos) B, el primer menú de la pareja tiene que listar las opciones de A, y cuando se selecciona una, devolver las opciones de B correspondientes y rellenar el menú B. 

  

Para crear menús en cascada basados en una asociación has_many, necesitarás un controlador en el servidor que maneje las solicitudes AJAX y devuelva los datos correspondientes: 

  

```java 

// Supongamos que tienes una función que maneja las solicitudes AJAX 

function fetchOptions(model, parentId) { 

    // Realizar la solicitud AJAX al servidor 

    // (Usa fetch, XMLHttpRequest o la biblioteca que prefieras) 

} 

  

// Supongamos que tienes eventos para manejar cambios en los menús 

document.getElementById('menuA').addEventListener('change', function() { 

    let selectedValue = this.value; 

     

    // Llamada AJAX para obtener opciones de B basadas en la selección de A 

    fetchOptions('B', selectedValue) 

        .then(response => response.json()) 

        .then(data => { 

            // Rellenar el menú B con las opciones obtenidas 

            let menuB = document.getElementById('menuB'); 

            // (Lógica para agregar opciones al menú B) 

        }); 

}); 

``` 

Tenemos dos menús desplegables en HTML con los IDs menuA y menuB. Al seleccionar una opción en el primer menú, se realiza una solicitud AJAX al servidor para obtener las opciones correspondientes para el segundo menú. 

  

4. Extienda la función de validación en ActiveModel para generar automáticamente código JavaScript que valide las entradas del formulario antes de que sea enviado. Por ejemplo, puesto que el modelo Movie de RottenPotatoes requiere que el título de cada película sea distinto de la cadena vacía, el código JavaScript debería evitar que el formulario Add New Movie se enviara si no se cumplen los criterios de validación, mostrar un mensaje de ayuda al usuario, y resaltar el(los) campo(s) del formulario que ocasionaron los problemas de validación. Gestiona, al menos, las validaciones integradas, como que los títulos sean distintos de cadena vacía, que las longitudes máxima y mínima de la cadena de caracteres sean correctas, que los valores numéricos estén dentro de los límites de los rangos, y para puntos adicionales, realiza las validaciones basándose en expresiones regulares. 

  

Extender la función de validación en ActiveModel para generar automáticamente código JavaScript: 

  

```java 

// Supongamos que tienes una función en Ruby que genera las reglas de validación 

function generateValidationRules(model) { 

    // Lógica para generar reglas de validación basadas en el modelo 

} 

  

// Supongamos que puedes obtener las reglas de validación en tu vista 

let validationRules = generateValidationRules('Movie'); 

  

// Supongamos que tienes una función que genera código JavaScript 

function generateJavaScriptCode(validationRules) { 

    // Lógica para convertir las reglas de validación en código JavaScript 

} 

  

// Supongamos que puedes insertar el código JavaScript generado en tu vista 

let jsCode = generateJavaScriptCode(validationRules); 

// (Insertar jsCode en la vista) 

``` 

 
