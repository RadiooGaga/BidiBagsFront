import React from 'react'
import StyledFooterPages from '../../StyledComponents/StyledFooterPages';
const { SectionTerms, DivTerms, SectionTermsH3, TermsParagraph, Underline } = StyledFooterPages;


export const Terms = () => {
  return (
    <SectionTerms>
        <DivTerms>
          <SectionTermsH3><strong>Términos y Condiciones de Compra</strong></SectionTermsH3><br />
          <TermsParagraph>
          <strong>1. Introducción</strong>
          Bienvenido a BidiBags. Al realizar una compra en la página web, aceptas los términos y condiciones 
          establecidos a continuación. Te invitamos a leerlos cuidadosamente.
          <br />
          <br />
          <strong>2. Productos Hechos a Pedido</strong>
          Los productos se elaboran bajo pedido si no están disponibles en stock, lo que significa que, en muchos casos, 
          no habrá existencias disponibles de forma inmediata. Cuando se realice un pedido, se dará comienzo al proceso 
          de fabricación del producto específicamente para ti, por lo que los plazos de entrega pueden variar. 
          La producción suele tomar entre 7 y 15 días hábiles, pero este plazo puede extenderse y depender de si 
          es temporada alta, la complejidad del diseño o ante una alta demanda. <br /><br />
          <strong>3. Proceso de Pedido</strong>
	        1.	Selección del Producto: Selecciona el producto que deseas comprar. Todos los productos están hechos a 
              mano y son personalizables y tendrán una descripción clara de los plazos de entrega y detalles adicionales.
              <br />
	        2.	Confirmación de Pedido: Una vez realizado el pedido, <Underline>recibirás un correo electrónico de confirmación con 
              los detalles de la compra, el costo total y el tiempo estimado de entrega.</Underline>
	        3.	Plazo de Producción: Dado que todos nuestros productos son hechos a pedido, el tiempo de producción varía 
              dependiendo del artículo. Generalmente, la producción puede tardar entre [X] y [Y] semanas. Este plazo te
              será comunicado antes de confirmar el pedido.
              <br />
              <br />
          <strong>4. Precios y Pagos</strong>Los precios de los productos están indicados en la página del producto, y los impuestos 
             aplicables se calcularán al finalizar la compra.El pago debe realizarse en su totalidad al momento de hacer 
             el pedido. Aceptamos diversas formas de pago, como tarjetas de crédito, débito y otras opciones disponibles 
             en nuestra plataforma.<br /><br />
              <strong>5. Modificaciones del Pedido</strong>
              Dado que fabricamos productos bajo pedido, las modificaciones al pedido, como cambios de diseño, color o 
              tamaño, solo pueden hacerse dentro de las primeras [X] horas después de realizar la compra. Si deseas hacer 
              algún cambio, contáctanos lo antes posible.
              <br />
              <br />
              <strong>6. Devoluciones y Reembolsos</strong>

            •	Productos Personalizados Debido a la naturaleza personalizada de nuestros productos, no podemos aceptar 
              devoluciones o cambios, excepto en caso de que el producto esté defectuoso o no coincida con las especificaciones
              del pedido.
              <br />
            •	Productos Defectuosos: Si recibes un producto defectuoso o dañado, por favor notifícanos dentro de 3 días a 
              partir de la recepción del producto para iniciar el proceso de devolución o reembolso.
                <br />
                <br />
                <strong>7. Envíos</strong>El envío de productos hechos a pedido se realizará una vez que la producción esté completada. Te 
              proporcionaremos un número de seguimiento para que puedas seguir el estado de tu pedido. Los tiempos de 
              entrega variarán según tu ubicación.
                <br />
                <br />
                <strong>8. Responsabilidad</strong>Nos comprometemos a ofrecer productos de alta calidad, pero no nos hacemos responsables por 
              daños derivados del uso incorrecto o de la mala interpretación de las especificaciones del producto. Además, 
              no somos responsables de retrasos debido a circunstancias fuera de nuestro control, como problemas en el 
              transporte o el suministro de materiales.
                <br />
                <br />
                <strong>9. Propiedad Intelectual </strong>El contenido de nuestro sitio web, incluidos diseños, imágenes, textos y logos, está 
              protegido por derechos de autor y otras leyes de propiedad intelectual. No está permitido reproducir, modificar 
              ni distribuir este contenido sin nuestra autorización expresa.
                <br />
                <br />
                <strong>10. Cambios en los Términos</strong>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier 
              momento. Cualquier cambio será efectivo inmediatamente después de su publicación en este sitio web.
                <br />
                <br />
                <strong>11. Contacto </strong>Si tienes alguna pregunta sobre nuestros términos y condiciones, puedes ponerte en contacto con 
              a través de [correo electrónico o número de teléfono].
              

          </TermsParagraph>
        </DivTerms>
    </SectionTerms>
  )
}
