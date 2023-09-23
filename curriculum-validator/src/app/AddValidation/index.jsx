import { 
  Wrapper
} from './styles';

function AddValidation({show, curriculumName}) {

  return (
    <Wrapper show={show}>
       <p>{curriculumName}</p>
    </Wrapper>
  );
}

export default AddValidation;
