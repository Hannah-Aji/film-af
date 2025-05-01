
// ProfileForm.jsx
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProfileForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await addDoc(collection(db, 'users'), data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />
      <button type="submit">Submit</button>
    </form>
  );
};


export default ProfileForm;