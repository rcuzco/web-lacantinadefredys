# Manual de mantenimiento — La Cantina de Fredy's

**Para:** responsable de contenidos del sitio web  
**Nivel requerido:** no se necesitan conocimientos de programación  
**Última revisión:** mayo 2026

---

## Atajos de teclado — referencia rápida

A lo largo de este manual se indican atajos de teclado. Aquí tienes la equivalencia entre Windows y Mac:

| Acción | Windows | Mac |
|---|---|---|
| Guardar el archivo | **Ctrl + S** | **Cmd + S** |
| Buscar texto en el archivo | **Ctrl + F** | **Cmd + F** |
| Deshacer el último cambio | **Ctrl + Z** | **Cmd + Z** |
| Recargar la página en el navegador | **F5** o **Ctrl + R** | **Cmd + R** |

> En Mac, la tecla **Cmd** (Comando) lleva el símbolo ⌘ y está junto a la barra espaciadora.

---

## Antes de empezar — herramienta necesaria

Para editar el sitio necesitas un **editor de texto** que muestre números de línea. La opción gratuita recomendada es **Visual Studio Code** (VS Code).

### Cómo instalar VS Code

1. Ve a [https://code.visualstudio.com](https://code.visualstudio.com).
2. La página detectará tu sistema operativo automáticamente y mostrará el botón de descarga correcto. Si no, elige manualmente:
   - **Windows:** descarga el instalador `.exe` y ejecútalo como cualquier programa.
   - **Mac:** descarga el archivo `.zip`, descomprímelo y arrastra la aplicación **Visual Studio Code** a tu carpeta **Aplicaciones**.
3. Al abrirlo verás el número de cada línea en el margen izquierdo.

### Cómo abrir los archivos del sitio

1. Abre VS Code.
2. En el menú superior: **Archivo → Abrir carpeta…**
3. Navega hasta la carpeta del proyecto (donde está `index.html`) y haz clic en **Seleccionar carpeta** (Windows) o **Abrir** (Mac).
4. En el panel izquierdo verás todos los archivos del proyecto.

---

## Estructura de archivos — lo que necesitas saber

Solo editarás **dos archivos**. El resto no hay que tocarlo.

```
web-restaurante/
│
├── index.html          ← Aquí están todos los textos e imágenes de la página
│
├── js/
│   └── main.js         ← Aquí están el teléfono, WhatsApp y dirección
│
└── assets/
    ├── images/       ← Aquí van TODAS las imágenes del sitio
    ├── videos/       ← Aquí van los vídeos
    └── documents/    ← Aquí va el menú PDF
```

> **Regla de oro:** Si no está explicado en este manual, no lo toques. Un cambio en el lugar equivocado puede romper la página.

---

## SECCIÓN 1 — Datos de contacto (teléfono, WhatsApp, dirección)

**Archivo:** `js/main.js`  
**Líneas:** 10 a 20

Estos son los únicos datos que hay que editar en este archivo. Todo el resto del archivo es código que mueve la página — no lo toques.

Abre `js/main.js`. Al principio del archivo encontrarás este bloque:

```js
const RESTAURANT = {
  name:         "La Cantina de Fredy's",
  phone:        "+34911887741",
  phoneDisplay: "+34 911 887 741",
  whatsappNum:  "34911887741",
  whatsappMsg:  "Hola, me gustaría hacer una consulta sobre La Cantina de Fredy's.",
  address:      "Dirección pendiente de confirmar, Madrid, España",
  mapsUrl:      "https://maps.google.com/?q=La+Cantina+de+Fredys"
};
```

### Cambiar el teléfono

Hay **dos líneas** para el teléfono. Deben tener el mismo número, pero con formato diferente:

- `phone` → el número sin espacios, con `+34` delante. Ejemplo: `"+34911887741"`
- `phoneDisplay` → el número como se mostrará en pantalla. Ejemplo: `"+34 911 887 741"`

**Ejemplo de cambio** (si el nuevo número fuera 600 111 222):
```js
phone:        "+34600111222",
phoneDisplay: "+34 600 111 222",
```

### Cambiar el número de WhatsApp

La línea `whatsappNum` es el número de WhatsApp. Debe escribirse **sin el símbolo +**, pero con el código de país `34`:

```js
whatsappNum:  "34600111222",
```

> **Importante:** El número de teléfono y el de WhatsApp pueden ser el mismo o diferente. Edítalos de forma independiente según corresponda.

### Cambiar el mensaje automático de WhatsApp

Cuando alguien hace clic en el botón de WhatsApp, se abre un chat con este mensaje prellenado. Puedes cambiarlo editando `whatsappMsg`:

```js
whatsappMsg:  "Hola, me gustaría reservar una mesa en La Cantina de Fredy's.",
```

### Cambiar la dirección

Edita la línea `address` con la dirección real del restaurante:

```js
address:      "Calle Gran Vía 10, 28013 Madrid, España",
```

### Cambiar el enlace de Google Maps

La línea `mapsUrl` es la URL que se abre cuando alguien hace clic en "Cómo llegar". Para obtener la URL correcta:

1. Ve a [Google Maps](https://maps.google.com) y busca el restaurante.
2. Una vez localizado, copia la URL que aparece en la barra de direcciones del navegador.
3. Pega esa URL entre las comillas de `mapsUrl`:

```js
mapsUrl:      "https://www.google.com/maps/place/La+Cantina+de+Fredys/@40.41650,-3.70379,17z/..."
```

### Guardar los cambios

Pulsa **Ctrl + S** (Windows) o **Cmd + S** (Mac). El cambio se aplicará automáticamente en toda la página (teléfono, pie de página, botón de contacto, etc.) sin tocar ningún otro archivo.

---

## SECCIÓN 2 — Platos destacados (tarjetas de platos)

**Archivo:** `index.html`  
**Líneas aproximadas:** 235 a 440

Los platos aparecen como tarjetas en la sección "Platos para enamorarse". Cada tarjeta tiene esta estructura:

```html
<article class="dish-card">
  <div class="dish-img-wrap">
    <img src="assets/images/cantina-photo-08.webp"
         alt="Totopos con guacamole casero"
         loading="lazy" decoding="async">
    <span class="dish-tag tag-compartir">Para compartir</span>
  </div>
  <div class="dish-body">
    <h3 class="dish-name">Totopos con Guacamole</h3>
    <p class="dish-desc">Totopos crujientes de maíz con guacamole fresco preparado al momento, pico de gallo y jalapeño.</p>
    <div class="dish-footer">
      <span class="dish-price">8.50 €</span>
      <button class="dish-btn" ...>Ver carta</button>
    </div>
  </div>
</article>
```

Para encontrar un plato concreto, usa la búsqueda de VS Code: **Ctrl + F** (Windows) o **Cmd + F** (Mac) y escribe el nombre del plato.

### Cambiar el nombre de un plato

Busca la línea con `class="dish-name"` dentro del plato y cambia el texto entre las etiquetas `<h3>` y `</h3>`:

```html
<h3 class="dish-name">Aquí va el nuevo nombre</h3>
```

### Cambiar la descripción de un plato

Busca la línea con `class="dish-desc"` y cambia el texto entre `<p>` y `</p>`:

```html
<p class="dish-desc">Nueva descripción del plato.</p>
```

### Cambiar el precio de un plato

Busca la línea con `class="dish-price"` y cambia solo el número y el símbolo €:

```html
<span class="dish-price">10.50 €</span>
```

> **Atención:** No borres las etiquetas `<span class="dish-price">` ni `</span>`. Solo cambia el texto que hay entre ellas.

### Cambiar la etiqueta de categoría de un plato

Cada plato tiene una etiqueta de color (por ejemplo "Para compartir", "Especialidad", "Tacos", "Bebidas"). Para cambiarla, localiza esta línea dentro del plato:

```html
<span class="dish-tag tag-compartir">Para compartir</span>
```

Las opciones disponibles son:

| Clase CSS | Texto sugerido |
|---|---|
| `tag-compartir` | Para compartir |
| `tag-especialidad` | Especialidad |
| `tag-tacos` | Tacos |
| `tag-bebidas` | Bebidas |

Para cambiar la etiqueta, modifica **tanto** la clase como el texto. Por ejemplo, para pasar de "Para compartir" a "Tacos":

```html
<span class="dish-tag tag-tacos">Tacos</span>
```

### Cambiar la imagen de un plato

La imagen se indica en la línea `src=` dentro del bloque `<img ...>`:

```html
<img src="assets/images/cantina-photo-08.webp"
     alt="Descripción de la foto"
     loading="lazy" decoding="async">
```

Para cambiar la imagen:

1. Copia el nuevo archivo de imagen dentro de la carpeta `assets/images/`.
2. Escribe el nombre exacto del archivo (incluyendo la extensión `.webp` o `.jpg`) en la ruta `src=`:

```html
<img src="assets/images/mi-nueva-foto.webp"
     alt="Descripción breve de la nueva foto"
     loading="lazy" decoding="async">
```

3. Actualiza también el texto del atributo `alt=` con una descripción breve de la nueva imagen. Esto es importante para accesibilidad y SEO.

> **Formatos de imagen admitidos:** `.webp` (preferido por su menor tamaño), `.jpg`, `.png`.  
> **Nombre del archivo:** usa solo letras minúsculas, números y guiones. Sin espacios ni caracteres especiales. Ejemplo: `tacos-al-pastor-nuevos.webp`

---

## SECCIÓN 3 — Carta completa (lista de platos por categoría)

**Archivo:** `index.html`  
**Líneas aproximadas:** 455 a 560

La sección "Carta completa" muestra los platos organizados por categorías con sus precios. Cada entrada tiene esta estructura:

```html
<div class="menu-item">
  <span class="mi-name">Nombre del plato</span>
  <span class="mi-dots"></span>
  <span class="mi-price">9.90 €</span>
</div>
```

Para buscar un plato usa **Ctrl + F** (Windows) o **Cmd + F** (Mac) con el nombre del plato.

### Cambiar el nombre de un plato en la carta

Cambia solo el texto dentro de `<span class="mi-name">` y `</span>`:

```html
<span class="mi-name">Nuevo nombre del plato</span>
```

### Cambiar el precio en la carta

Cambia solo el número dentro de `<span class="mi-price">` y `</span>`:

```html
<span class="mi-price">11.50 €</span>
```

### Añadir un nuevo plato a la carta

Copia este bloque completo y pégalo justo debajo del último plato de la categoría donde quieres añadirlo:

```html
<div class="menu-item">
  <span class="mi-name">Nombre del nuevo plato</span>
  <span class="mi-dots"></span>
  <span class="mi-price">10.90 €</span>
</div>
```

### Eliminar un plato de la carta

Selecciona el bloque completo desde `<div class="menu-item">` hasta su `</div>` de cierre y bórralo. Usa **Ctrl + F** (Windows) o **Cmd + F** (Mac) para localizar el plato por su nombre.

---

## SECCIÓN 4 — Menú del día

**Archivo:** `index.html`  
**Líneas aproximadas:** 600 a 658

### Cambiar el precio del menú del día

Busca (**Ctrl + F** / **Cmd + F**) el texto `dia-price-num`. Encontrarás esto:

```html
<div class="dia-price-num">
  <span class="dia-price-sym">€</span>15
</div>
```

Cambia solo el número `15`. No toques `<span class="dia-price-sym">€</span>`.

### Cambiar el horario del menú del día

Busca el texto `Disponible de`. Encontrarás:

```html
<span>Disponible de <strong>13:00 a 16:00</strong>, de martes a viernes</span>
```

Cambia el horario y los días dentro de las etiquetas `<strong>` y `</strong>`. No toques el texto que está fuera de ellas.

### Cambiar los platos de primeros

Busca el texto `dia-col-title">Primeros`. Debajo verás la lista:

```html
<ul class="dia-list">
  <li>Ensalada fresca de aguacate y maíz</li>
  <li>Totopos con guacamole casero</li>
  <li>Sopa azteca tradicional</li>
  <li>Quesadillas clásicas</li>
</ul>
```

Cada línea `<li>` es un plato. Cambia el texto entre `<li>` y `</li>`.  
Para añadir un plato, añade una línea nueva con el mismo formato.  
Para eliminar un plato, borra la línea completa.

### Cambiar los platos de segundos

Haz lo mismo en el bloque `<ul class="dia-list">` que está justo debajo de `dia-col-title">Segundos`.

---

## SECCIÓN 5 — Horario de apertura

**Archivo:** `index.html`  
**Líneas aproximadas:** 836 a 870

Cada día de la semana tiene un bloque como este:

```html
<div class="horario-card" data-day="2">
  <p class="horario-day">Martes</p>
  <p class="horario-time">13:00 – 16:00</p>
  <p class="horario-note">Menú del día disponible</p>
</div>
```

> **No cambies** el número que aparece en `data-day="2"`. Ese número es el que hace que el día actual se resalte automáticamente en la web y no debe modificarse.

Los números corresponden a: `0` = Domingo, `1` = Lunes, `2` = Martes, `3` = Miércoles, `4` = Jueves, `5` = Viernes, `6` = Sábado.

### Cambiar el horario de un día

Modifica el texto entre `<p class="horario-time">` y `</p>`. Ejemplos:

```html
<p class="horario-time">13:00 – 16:00 / 20:00 – 23:00</p>
<p class="horario-time">Cerrado</p>
<p class="horario-time">Consultar</p>
```

### Cambiar la nota de un día

Modifica el texto entre `<p class="horario-note">` y `</p>`. Ejemplo:

```html
<p class="horario-note">Cocina abierta todo el día</p>
```

---

## SECCIÓN 6 — Galería de fotos

**Archivo:** `index.html`  
**Líneas aproximadas:** 673 a 757

La galería tiene dos partes: una **cuadrícula principal** (8 fotos grandes) y una **tira horizontal** (10 fotos pequeñas).

### Cambiar una foto de la cuadrícula principal

Cada foto de la cuadrícula tiene esta estructura:

```html
<div class="gi">
  <img src="assets/images/cantina-photo-13.webp"
       alt="Interior del restaurante La Cantina de Fredy's con murales mexicanos"
       loading="lazy" decoding="async">
  <div class="gi-overlay"></div>
</div>
```

Para cambiar la foto:

1. Copia el nuevo archivo de imagen en la carpeta `assets/images/`.
2. Localiza la foto que quieres sustituir buscando (**Ctrl + F** / **Cmd + F**) el nombre del archivo actual.
3. Cambia el nombre del archivo en `src=` por el nombre del nuevo archivo.
4. Actualiza el texto del `alt=` describiendo brevemente la nueva foto.

### Cambiar una foto de la tira horizontal

Las fotos de la tira tienen este formato:

```html
<div class="strip-item" role="listitem">
  <img src="assets/images/cantina-photo-01.webp" alt="Tacos al pastor" loading="lazy" decoding="async">
</div>
```

El procedimiento es el mismo: copia la foto nueva a `assets/images/`, localiza la línea y cambia el `src=` y el `alt=`.

> **Consejo:** Para que las fotos carguen rápido, usa formato `.webp`. Si solo tienes la foto en `.jpg` o `.png`, también funciona, pero el sitio cargará un poco más lento.

---

## SECCIÓN 7 — Redes sociales

**Archivo:** `index.html`  
**Líneas aproximadas:** 937 a 946

Busca (**Ctrl + F** / **Cmd + F**) el texto `Instagram de La Cantina`. Encontrarás este bloque:

```html
<a href="#" class="social-link" aria-label="Instagram de La Cantina de Fredy's" target="_blank" rel="noopener">
  <i class="fa-brands fa-instagram"></i>
</a>
<a href="#" class="social-link" aria-label="Facebook de La Cantina de Fredy's" target="_blank" rel="noopener">
  <i class="fa-brands fa-facebook-f"></i>
</a>
<a href="#" class="social-link" aria-label="TikTok de La Cantina de Fredy's" target="_blank" rel="noopener">
  <i class="fa-brands fa-tiktok"></i>
</a>
```

Para cada red social, sustituye el `#` por la URL del perfil real. Por ejemplo:

```html
<a href="https://www.instagram.com/lacantinadefredy" ...>
<a href="https://www.facebook.com/lacantinadefredy" ...>
<a href="https://www.tiktok.com/@lacantinadefredy" ...>
```

> **Importante:** Las redes sociales aparecen **dos veces** en la página: una en la sección de Contacto y otra en el pie de página. Busca con **Ctrl + F** / **Cmd + F** el texto `Instagram` y repite el cambio en ambas apariciones.

---

## SECCIÓN 8 — Mapa de Google

**Archivo:** `index.html`  
**Líneas aproximadas:** 956 a 966

Actualmente la sección del mapa muestra un texto provisional. Para activar el mapa real:

### Paso 1: obtener el código del mapa

1. Ve a [Google Maps](https://maps.google.com) y busca la dirección exacta del restaurante.
2. Haz clic en el botón **Compartir** (icono de cadena).
3. En la ventana que aparece, selecciona la pestaña **Insertar un mapa**.
4. Copia todo el código HTML que aparece. Empieza por `<iframe` y termina por `</iframe>`.

### Paso 2: pegarlo en el archivo

En `index.html` busca (**Ctrl + F** / **Cmd + F**) el texto `map-frame`. Encontrarás:

```html
<div class="map-frame gsap-fade" id="map-frame">
  <!-- TODO: Reemplaza este div con el iframe real de Google Maps ... -->
  <div class="map-placeholder-content">
    ...
  </div>
</div>
```

Elimina todo lo que hay **dentro** del `<div class="map-frame gsap-fade" id="map-frame">` (el comentario y el `map-placeholder-content` completo) y sustitúyelo por el código `<iframe>` que copiaste de Google Maps. El resultado debe quedar así:

```html
<div class="map-frame gsap-fade" id="map-frame">
  <iframe src="https://www.google.com/maps/embed?pb=..."
          width="600" height="450" style="border:0;"
          allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
```

---

## SECCIÓN 9 — Menú PDF descargable

**Archivo:** `assets/images/`

El botón "Descargar menú PDF" está enlazado al archivo `assets/documents/MENU LA CANTINA DE FREDYS.pdf`.

Para actualizar el menú en PDF:

1. Prepara el nuevo archivo PDF del menú.
2. Renómbralo exactamente como: `MENU LA CANTINA DE FREDYS.pdf` (respetando mayúsculas, espacios y tildes).
3. Copia el archivo en la carpeta `assets/images/`, sustituyendo el anterior.

No es necesario cambiar nada en `index.html`.

---

## Cómo ver los cambios en el navegador

Una vez guardados los cambios (**Ctrl + S** en Windows / **Cmd + S** en Mac):

1. Abre el archivo `index.html`:
   - **Windows:** doble clic sobre el archivo en el Explorador de archivos.
   - **Mac:** doble clic sobre el archivo en el Finder, o haz clic derecho → **Abrir con** → elige tu navegador.
2. Si ya lo tenías abierto en el navegador, recárgalo:
   - **Windows:** pulsa **F5** o **Ctrl + R**.
   - **Mac:** pulsa **Cmd + R**.

Si los cambios son para el sitio publicado en internet, necesitarás subir los archivos modificados al servidor. Pregunta al responsable técnico cómo hacerlo para tu alojamiento concreto.

---

## Errores frecuentes y cómo evitarlos

| Error | Causa | Solución |
|---|---|---|
| La página se ve en blanco o rota | Se borró o modificó código HTML por error | Deshaz el cambio con **Ctrl + Z** (Windows) o **Cmd + Z** (Mac) y vuelve a intentarlo |
| Una imagen no aparece | El nombre del archivo en `src=` no coincide exactamente con el nombre real | Revisa mayúsculas, tildes y extensión del archivo |
| El teléfono no aparece actualizado | Solo se cambió `phoneDisplay` pero no `phone` (o viceversa) | Asegúrate de actualizar las dos líneas en `main.js` |
| Los cambios no se ven en el navegador | El archivo no se guardó | Pulsa **Ctrl + S** (Windows) o **Cmd + S** (Mac) antes de recargar el navegador |
| Aparece texto `#` en un enlace de red social | El enlace real no se ha actualizado aún | Edita el `href="#"` con la URL real del perfil |

---

## ¿Necesitas ayuda?

Si tienes dudas que no están cubiertas en este manual, contacta con el desarrollador del sitio antes de hacer cambios. Un pequeño error en el código puede afectar a toda la página.
