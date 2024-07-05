import * as yup from 'yup';
import InvalidTaskException from '@/exceptions/invalidTaskException'
import StatusRepo from '@/repositories/statusRepo'

const validate = async ({title, status, description}) => {
  const status_options = await StatusRepo.all()
    .then(s => s.map(({title}) => title))
  const schema = yup.object().shape({
    title: yup.string().trim().required("You must enter a title."),
    description: yup.string().trim().required("You must enter a description."),
    status: yup.string().oneOf(status_options).required("You must enter a status."),
  });
  try {
    await schema.validate({ title, description, status })
    return true
  }
  catch(err) {
    throw new InvalidTaskException(err.errors)
  }
}

export default { validate }
