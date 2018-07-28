
const getMe = (req,res) =>{

   res.send(req.user);
}

module.exports = {getMe};