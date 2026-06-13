# Proyecto SOLID - Reserva Ecológica

Este proyecto demuestra la aplicación correcta de los 5 principios SOLID en un contexto de una Reserva Ecológica. El código base inicial contenía violaciones a cada principio, las cuales fueron corregidas sistemáticamente.

## Instalación

```bash
npm install
npm run dev
```

## Estructura del Proyecto

```
src/
├── 01-srp/          # Single Responsibility Principle
├── 02-ocp/          # Open/Closed Principle
├── 03-lsp/          # Liskov Substitution Principle
├── 04-isp/          # Interface Segregation Principle
├── 05-dip/          # Dependency Inversion Principle
└── data/            # Data providers
```

## Gestión de Git

El proyecto utiliza 5 ramas independientes, una por cada principio SOLID:

- `feature/01-SRP` - Corrección del principio SRP
- `feature/02-OCP` - Corrección del principio OCP
- `feature/03-LSP` - Corrección del principio LSP
- `feature/04-ISP` - Corrección del principio ISP
- `feature/05-DIP` - Corrección del principio DIP

Cada cambio sigue el estándar **Conventional Commits**:
- `refactor(srp):` - Para correcciones del principio SRP
- `refactor(ocp):` - Para correcciones del principio OCP
- `refactor(lsp):` - Para correcciones del principio LSP
- `refactor(isp):` - Para correcciones del principio ISP
- `refactor(dip):` - Para correcciones del principio DIP

---

# Bitácora Reflexiva: Antes y Después

## 1. Single Responsibility Principle (SRP)

### Antes
La clase `ProductBloc` violaba el SRP al tener múltiples responsabilidades:
- Cargar productos desde el inventario
- Guardar productos en la base de datos
- Enviar notificaciones por correo electrónico

Esto creaba una clase "Dios" que hacía demasiadas cosas, haciendo el código difícil de mantener, probar y extender. Cualquier cambio en la lógica de notificaciones afectaba la lógica de productos, violando la separación de preocupaciones.

### Después
Separé las responsabilidades en tres clases especializadas:
- `EmailService`: Responsabilidad única - envío de notificaciones
- `ProductRepository`: Responsabilidad única - persistencia de productos
- `ProductBloc`: Responsabilidad única - coordinación de lógica de negocio

**Beneficios:**
- Cada clase tiene una única razón para cambiar
- Facilita el testing unitario de cada responsabilidad
- Permite reutilizar `EmailService` en otros módulos
- Mejora la legibilidad y mantenibilidad del código

**Pregunta de Reflexión:** ¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes?

**Respuesta:** Con el diseño anterior, tendría que modificar `ProductBloc` ya que la lógica de notificaciones estaba mezclada con la lógica de productos. Ahora, solo tendría que crear un nuevo `WhatsAppService` y modificar la clase que coordina las notificaciones, sin afectar la lógica de productos. La separación de responsabilidades permite cambiar el canal de notificación modificando solo una clase en lugar de varias.

### Reflexión
El principio SRP es fundamental pero a menudo malinterpretado. No se trata de que una clase tenga un solo método, sino de que tenga una única razón para cambiar. En este caso, la separación de responsabilidades permitió un diseño más modular y desacoplado, donde cada componente puede evolucionar independientemente.

---

## 2. Open/Closed Principle (OCP)

### Antes
Las clases `NewsService` y `PhotosService` dependían directamente de `axios`, una implementación concreta. Si queríamos cambiar a `fetch` u otra librería HTTP, teníamos que modificar el código existente, violando el principio de abierto para extensión pero cerrado para modificación.

### Después
Creé una abstracción `HttpClient` con dos implementaciones:
- `FetchHttpClient`: Implementación usando Fetch API
- `MockHttpClient`: Implementación simulada para pruebas

Los servicios ahora dependen de la abstracción `HttpClient` a través de inyección de dependencias en el constructor.

**Beneficios:**
- Podemos agregar nuevas implementaciones HTTP sin modificar el código existente
- Facilita el testing con mocks
- Permite cambiar de implementación en tiempo de ejecución
- Cumple con el principio de inversión de dependencias

**Pregunta de Reflexión:** Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño?

**Respuesta:** Con este diseño, la migración sería casi inmediata. Solo tendría que cambiar la implementación inyectada en el constructor de los servicios de `AxiosHttpClient` a `FetchHttpClient`. No necesitaría modificar el código de `NewsService` ni `PhotosService`, ya que dependen de la abstracción `HttpClient` y no de la implementación concreta. El cambio se limita a la instanciación de las dependencias, lo que permite una migración en minutos.

### Reflexión
El principio OCP es crucial para la evolución del software. Al depender de abstracciones en lugar de implementaciones concretas, el código se vuelve más flexible y adaptable a cambios futuros. Este patrón también prepara el terreno para aplicar otros principios como DIP.

---

## 3. Liskov Substitution Principle (LSP)

### Antes
El `VehicleManager` usaba múltiples condicionales `instanceof` para tratar diferentes marcas de vehículos. Esto violaba LSP porque el cliente debía conocer los detalles de implementación de cada tipo. Además, agregar una nueva marca requería modificar el `VehicleManager`, violando también OCP.

### Después
Creé una interfaz `Vehicle` con métodos polimórficos:
- `getModel()`: Retorna el modelo del vehículo
- `getSpecialFeature()`: Retorna la característica especial específica

Todas las clases (`Tesla`, `Audi`, `Toyota`, `Honda`, `Ford`, `Volvo`) implementan esta interfaz. El `VehicleManager` ahora trata a todos los vehículos de manera uniforme sin necesidad de verificaciones de tipo.

**Beneficios:**
- Cualquier subtipo de `Vehicle` puede ser sustituido por otro
- Agregar nuevos vehículos no requiere modificar `VehicleManager`
- El código es más limpio y mantenible
- Cumple con el polimorfismo orientado a objetos

**Pregunta de Reflexión:** Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos if/else?

**Respuesta:** Sí, completamente. Solo tendría que crear una clase `Drone` que implemente la interfaz `Vehicle` con sus métodos `getModel()` y `getSpecialFeature()`. El `VehicleManager` procesaría el dron exactamente igual que cualquier otro vehículo sin necesidad de agregar condicionales `instanceof` o lógica específica. El polimorfismo garantiza que el manager trate a todos los vehículos de manera uniforme.

### Reflexión
LSP es a menudo el principio más difícil de entender y aplicar correctamente. La clave es asegurar que los subtipos sean verdaderamente sustituibles por sus tipos base. En este caso, la eliminación de los condicionales `instanceof` y la creación de una interfaz común permitió un diseño más robusto y extensible.

---

## 4. Interface Segregation Principle (ISP)

### Antes
La interfaz `Bird` era "gorda", obligando a todas las aves a implementar `eat()`, `fly()` y `swim()`. Esto causaba problemas:
- `Hummingbird` lanzaba una excepción en `swim()`
- `Ostrich` lanzaba una excepción en `fly()`
- `Toucan` implementaba `swim()` con un método vacío

Esto violaba ISP porque las clases eran forzadas a depender de métodos que no usaban.

### Después
Segregué la interfaz en interfaces más específicas:
- `IBird`: Interfaz base con `eat()`
- `IFlyingBird`: Extiende `IBird` con `fly()`
- `ISwimmingBird`: Extiende `IBird` con `swim()`

Cada clase implementa solo las interfaces que corresponden a sus capacidades naturales:
- `Toucan`: Implementa `IFlyingBird`
- `Hummingbird`: Implementa `IFlyingBird`
- `Ostrich`: Implementa `ISwimmingBird`
- `Penguin`: Implementa `ISwimmingBird`
- `Duck`: Implementa `IFlyingBird` y `ISwimmingBird`

**Beneficios:**
- No hay métodos vacíos ni excepciones innecesarias
- Cada clase implementa solo lo que realmente necesita
- El código es más seguro y predecible
- Facilita la comprensión de las capacidades de cada clase

**Pregunta de Reflexión:** ¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores?

**Respuesta:** Mi diseño evita esto segregando la interfaz `Bird` en interfaces más específicas. El pingüino solo implementa `ISwimmingBird` (que incluye `eat()` y `swim()`), pero no `IFlyingBird` (que incluye `fly()`). De esta forma, el pingüino nunca tiene un método `fly()` que deba implementar con una excepción o método vacío. Cada ave implementa solo las interfaces que corresponden a sus capacidades naturales, eliminando comportamientos anómalos.

### Reflexión
ISP nos enseña que "menos es más" cuando se trata de interfaces. Las interfaces deben ser cohesivas y específicas al contexto de uso. En este caso, la segregación permitió un diseño más natural donde cada ave expone solo sus capacidades reales, eliminando comportamientos anómalos.

---

## 5. Dependency Inversion Principle (DIP)

### Antes
`PostService` dependía directamente de `LocalDatabaseService`, una implementación concreta. La instanciación se hacía dentro del método `getPosts()`, lo que hacía imposible cambiar de proveedor de datos sin modificar el código. Esto violaba DIP porque el módulo de alto nivel (`PostService`) dependía del módulo de bajo nivel (`LocalDatabaseService`).

### Después
Creé una abstracción `IDatabaseProvider` con el método `getPosts()`. Las implementaciones concretas (`LocalDatabaseService`, `JsonDatabaseService`, `ApiDatabaseService`) implementan esta interfaz. `PostService` ahora recibe la dependencia a través del constructor.

**Beneficios:**
- `PostService` depende de la abstracción, no de implementaciones concretas
- Podemos cambiar de proveedor de datos sin modificar `PostService`
- Facilita el testing con mocks
- Ambos módulos dependen de abstracciones, cumpliendo DIP completamente

**Pregunta de Reflexión:** ¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora?

**Respuesta:** Es extremadamente fácil. Solo necesito crear una clase `MockDatabase` que implemente la interfaz `IDatabaseProvider` y luego inyectarla en el constructor de `PostService` durante las pruebas. No necesito modificar el código de `PostService` ni usar técnicas complejas de mocking. La inyección por constructor permite reemplazar la dependencia real con un mock de manera transparente, facilitando enormemente las pruebas unitarias.

### Reflexión
DIP es el principio que une a todos los demás. Al invertir las dependencias, creamos un código más flexible y desacoplado. Este patrón es fundamental para arquitecturas escalables y es la base de frameworks de inyección de dependencias modernos.

---

# Conclusión General

La aplicación sistemática de los principios SOLID transformó un código acoplado y difícil de mantener en una arquitectura modular, extensible y robusta. Cada principio aborda un aspecto específico del diseño de software:

1. **SRP** asegura que cada componente tenga una única responsabilidad
2. **OCP** permite extender el comportamiento sin modificar código existente
3. **LSP** garantiza que los subtipos sean verdaderamente sustituibles
4. **ISP** evita que las clases dependan de interfaces que no usan
5. **DIP** invierte las dependencias para desacoplar módulos de alto y bajo nivel

Juntos, estos principios crean un código que es más fácil de entender, probar, mantener y evolucionar a lo largo del tiempo. La inversión inicial en aplicar estos principios se paga dividendos a medida que el proyecto crece en complejidad.