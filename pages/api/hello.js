// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {saveStudentFile} from '../../components/Student/Form'
export default (req, res) => {
 saveStudentFile()
 res.statusCode = 200
 res.json({ name: `E ${process.env.API}` })
}
