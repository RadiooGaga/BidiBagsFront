import React from 'react'
import StyledFooterPages from '../../StyledComponents/StyledFooterPages';
const { SectionTerms, DivTerms, SectionTermsH3, TermsParagraph, Underline } = StyledFooterPages;

export const Shipping = () => {
  return (
    <SectionTerms>
        <DivTerms>
          <SectionTermsH3><strong>Políticas de envío</strong></SectionTermsH3><br />
          <TermsParagraph>
          <strong>1. Tiempos de envío</strong>
          Una vez que tu pedido esté terminado, se procesará para el envío. El tiempo estimado de entrega 
          dependerá del destino y del método de envío seleccionado: <br />
	        •	Envíos nacionales: [tiempo estimado, ej.: 3-5 días hábiles] <br />
	        •	Envíos internacionales: [tiempo estimado, ej.: 7-14 días hábiles] <br /><br />
          Nota: Estos tiempos son estimados y pueden variar según la disponibilidad del servicio de 
          mensajería y posibles retrasos aduaneros en el caso de envíos internacionales.
          <br />
          <br />
          <strong>2. Confirmación y Notificación de Envío</strong>
          Una vez que el producto esté listo y haya sido enviado, recibirás un correo electrónico con la 
          confirmación del envío y el número de rastreo, si aplica, para que puedas hacer el seguimiento de tu pedido.
          <br /><br />
          <strong>3. Costos de Envío</strong>
          Los costos de envío se calcularán en el momento de la compra y se añadirán al total del pedido. Los costos 
          pueden variar según el destino y el peso del paquete.
              <br />
              <br />
          <strong>4. Retrasos y Excepciones</strong>
          Dado que todos los productos son hechos a pedido, algunos factores pueden retrasar los tiempos de envío, 
          especialmente si hay un incremento en la demanda o si se requieren materiales especiales. Nos comprometemos 
          a mantenerte informado en caso de que haya algún retraso significativo.
              <br /><br />
          <strong>5. Política de Cambios y Devoluciones</strong>
          Debido a la naturaleza personalizada de nuestros productos hechos a pedido, no se aceptan devoluciones 
          ni cambios, excepto en caso de productos defectuosos o errores de fabricación. Si encuentras algún problema 
          con tu pedido, ponte en contacto con nosotros dentro de los [especificar, ej.: 7 días] posteriores a la 
          entrega.
          <br />
          <br />
          <strong>6. Zonas de Envío</strong>
          Actualmente, realizamos envíos a [países o zonas específicas]. Si tienes dudas sobre envíos a tu región, 
          por favor contáctanos antes de realizar el pedido.
          </TermsParagraph>
        </DivTerms>
    </SectionTerms>
  )
   
}
