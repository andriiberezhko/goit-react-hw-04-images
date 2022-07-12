import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onChangeInput = event => {
    setSearch(event.currentTarget.value);
  };

  const onSubmintForm = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmintForm}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button__label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends React.Component {
//   state = {
//     search: '',
//   };
// onChangeInput = event => {
//   const { name, value } = event.currentTarget;
//   this.setState({ [name]: value });
// };
// onSubmintForm = e => {
//   e.preventDefault();
//   this.props.onSubmit(this.state.search);
// };

//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   render() {
// return (
//   <header className={s.Searchbar}>
//     <form className={s.SearchForm} onSubmit={this.onSubmintForm}>
//       <button type="submit" className={s.SearchForm_button}>
//         <span className={s.SearchForm_button__label}>Search</span>
//       </button>

//       <input
//         className={s.SearchForm_input}
//         type="text"
//         name="search"
//         value={this.state.search}
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         onChange={this.onChangeInput}
//       />
//     </form>
//   </header>
// );
//   }
// }
