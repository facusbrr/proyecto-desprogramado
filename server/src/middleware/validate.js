//Si se rellena correctamente, pasaremos al controlador, en caso contrario enviaremos un mensaje de error al usuario.
export const validate = (schema) => async(req, res, next)=>{
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(400).json(err);
    }
};