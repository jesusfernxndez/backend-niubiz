# Bienvenido, por favor tomate un tiempo al leer los requerimientos del examen antes de empezar a resolverlo.

# Duración del examen: MAXIMO 8 HORAS.

# Consideraciones para el desarrollo del siguiente examen:

    Debemos poder crear un carrito de compras y generar una orden de compra, para ello debemos tener en cuenta las consideraciones y requerimientos tecnicos que a continuacion se listan.

    Adicionalmente, se debe usar una base de datos mongo y trabajar en entorno local, al finalizar el examen se debe adjuntar lo siguiente:

    1.- Archivo.ZIP con toda la codificacion que se realizo en los microservicios enviando la siguiente estructura en ZIP.

        examen_nombre_apellido_ddmmyyyy.zip

    2.- Enviar un BACKUP de tu base de datos de mongo/mysql/sqlserver en local (Opcional).

    3.- Usa el siguiente comando para crear microservicios con NestJs: nest new project-name

# Microservicios: Crear 4 microservicios cada uno con test unitarios.

# 0.- User [ Crear las siguientes apis ]: 
    - GET:   /api/users/v1.0/                                   - Lista de usuarios activos.
    - GET:   /api/users/v1.0/{idUser}                           - Lista de un usuario activo.

# 1.- Product [ Crear las siguientes apis ]: 
    - GET:   /api/product/v1.0/                                 - Lista de productos activos.
    - GET:   /api/product/v1.0/{idProduct}                      - Lista de un producto activo.

# 2.- Shopping-Card [ Crear las siguientes apis ]:
    - POST:  /api/shopping-card/v1.0/                           - Crear carrito de compra.
    - PATCH: /api/shopping-card/v1.0/{idUser}                   - Actualizar carrito compra (solo productos).
    - GET:   /api/shopping-card/v1.0/{idUser}/{idShoppingCard}  - Lista del carrito de compra activo.

# 3.- Purchase-Order [ Crear las siguientes apis ]:
    - POST: /api/purchase-order/v1.0/                               - Crear orden de compra.
    - GET:  /api/purchase-order/v1.0/{idUser}                       - Lista de ordenes de compra activos.
    - GET:  /api/purchase-order/v1.0/{idUser}/{idPurchaseOrder}     - Lista la ordenen de compra activo.

# Consideraciones:

# 1.- Contemplar los siguientes objeto de auditoria y estado para todos las colleciones

    auditProperties : {
        dateCreate: Date,           // Cuando se crea el registro
        dateUpdate: Date,           // Cuando se actualiza el registro
        userCreate: {               // Usuario creador
            idUser: Type.ObjectId,
            email: String
        },
        userUpdate: {               // Usuario actualizador
            idUser: Type.ObjectId,
            email: String
        },
        activeRecord: Boolean       // Verifica si un registro esta o no activo.
    }

    status: {
        value: Number,
        description: String
    }

# 2.- Logica de negocio

    2.1.- Solo se puede actualizar un carrito de compra si aun no se a generado un orden de compra a partir de ese carrito.

    2.2.- Los carritos de compra solo pueden tener codigo unico por usuario.
        ejm usuario 1: SH_A0001, SH_A0002 ...
        ejm usuario 2: SH_B0001, SH_B0002 ...
        ejm usuario 3: SH_C0001, SH_C0002 ...
        ...

    2.3.- Una orden de compra debe ser generada solo con el carrito de compra, la fecha de entrega y el usuario creador: 
    idSHoppingCard, deliveryDate, idUser

    2.4.- Las ordenes de compra solo pueden tener codigo unico para por usuario.
        ejm usuario 1: PO_A0001, PO_A0002 ...
        ejm usuario 2: PO_B0001, PO_B0002 ...
        ejm usuario 3: PO_C0001, PO_C0002 ...
        ...

    2.5.- Validar que el usuario solo pueda actalizar/listar su carrito de compras

    2.6.- Validar que el usuario pueda crear/listar su orden de compra (una orden de compra solo debe ser generada con mi carrito de compras no con otros carritos de compra de otros usuarios).


# 3.- Consideraciones tecnicas.

    3.2.- Se debe conectar desde el micro: 
            shopping-card hacia product via HTTP usando axios para obtener los productos o el producto.
            shopping-card hacia user via HTTP usando axios para obtener los usuarios o el usuario.
            
    3.3.- Se debe conecter desde el micro: 
            purchase-order hacia shopping-card via HTTP usando axios para obtener mi carrito de compra.
    
    3.4.- Tratar que todos los flujos sean fuertemente tipados, no se debe usar tipo de dato any en lo posible
    3.5.- Considerar tecnicas de codigo limpio
    3.6.- Considerar estandares para nombrar funciones, variables, etc

            variables booleanas - ejmplos:
                isValid, isMyShoppingCard, isMyPurchaseOrder, etc
                haveProductsMyShoppingCard, haveProductsMyPurchaseOrder, etc

            funciones - ejemplos:
                private generatePurchaseOrderNumber = (currentNumber: number, currentPrefix: string) => {}
                private generateShoppingCardNumber = (currentNumber: number, currentPrefix: string) => {}
                getProductsById = (idProduct: Type.ObjectId) => {}
                getProducts = () => {}

                createShoppingCard = (create: ICreateShoppingCard) => {}
                updateShoppingCard = (update: IUpdateShoppingCard) => {}
                getShoppingCards = () => {}
                getShoppingCardsById = (idShoppingCard: Type.ObjectId) => {}

                createPurchaseOrder = (create: ICreatePurchaseOrder) => {}
                getPurchaseOrders = () => {}
                getPurchaseOrdersById = (idPurchaseOrder: Type.ObjectId) => {}
    3.7.- Crear carrito de compra con el siguiente body:
            idUser: String

         - El carrito de compras se creara con todos sus atributos excepto el arreglo de productos, esto se va añadiendo o quitando como se vaya actualizando el carrito de compras.

    3.8.- Actualizar carrito de compra con el siguiente body:
            {
                idShoppingCard: String,
                idUser: String,
                products: [
                    {
                        idProduct: String,
                        quantity: Number
                    }
                ]
            }

            - Considerar validaciones para el Body
                - carrito de compras exista
                - usuario exista
                - usuario pueda editar este carrito
                - producto exista

    3.9.- Crear Orden de compra solo con el siguiente body:
            {
                idShoppingCard: String,
                idUser: String,
                deliveryDate: String
            }

    3.10.- Uso de NestJS, mongoose y typescript

    3.11.- Principios de programacion SOLID.
        - un archivo una unica responsabilidad

    3.12.- Cuando ya se cree la orden de compra (OP) se debe actualizar carrito de compra a Orden Generada para que sea bloqueada a futuras ordenes de compra. (manejar eventEmitter para esta operacion.)