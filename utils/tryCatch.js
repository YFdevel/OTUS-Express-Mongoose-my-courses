export const tryCatch = controller => async (req, res, next) => {
    try {
        await controller(req, res);
    } catch (error) {
        // res.status(500).json({message:error.message})
    }
};


