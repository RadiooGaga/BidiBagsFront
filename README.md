# PROYECTO 13 FINAL - BACKEND TO FRONTEND WITH REACT

# EL CONCEPTO:
Este proyecto lo he querido enfocar en lo que podría ser la futura web de mi mejor amiga. Es diseñadora
de moda y estilista, y lleva ya tres años creando poco a poco su marca. Tiene instagram y por ahí de momento
se va apañando, pero lo suyo es que tenga ya su web propia. Hace bolsos, mochilas y otros complementos a mano 
y bajo pequeño stock, ya que hace tiradas o colecciones de pocas unidades y las va vendiendo. Si le piden, va 
a demanda o a stock.

# LIBRERÍAS DE ESTILOS
Decidí no usar Chakra porque prefiero crear mis estilos de forma más libre. Sin embargo, sí que he
considerado usar Styled Components y Framer Motion. El primero por comodidad, ya que en varias páginas, 
por tener la misma estrucutura de estilos, de esta forma evito repetirlos y a la vez poder modificarlos
en bloque. El segundo, por la simplicidad de las animaciones con un código limpio en el mismo componente,
y adaptabilidad a la hora de reimplantarlo y ajustar los estilos según necesidad.


# RUTAS PROTEGIDAS
Un usuario no puede acceder a la barra de navegación de gestión del administrador dentro de la aplicación.
Ni siquiera cambiando los roles desde el inspector del navegador, ya que las rutas de administrador están protegidas con un estado de autenticación (AuthContext), el cual se comparte a lo largo de toda la aplicación.
