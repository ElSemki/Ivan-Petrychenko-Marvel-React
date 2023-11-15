import {
	Field,
	Form,
	Formik,
	ErrorMessage as FormikErrorMessage,
} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import './searchCharForm.scss';

const SearchCharForm = () => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharByName, clearError } = useMarvelService();

	const onCharLoaded = char => setChar(char);

	const updateChar = name => {
		clearError();
		getCharByName(name).then(onCharLoaded);
	};

	const errorMessage = error ? (
		<div className="search-form__critical-error">
			<ErrorMessage />
		</div>
	) : null;

	const charFoundMessage = !char ? null : char.length > 0 ? (
		<div className="search-form__search-wrapper">
			<span className="search-form__search-success">
				There is! Visit {char[0].name} page?
			</span>
			<Link
				className="button button__secondary"
				to={`/characters/${char[0].name}`}
			>
				<div className="inner">To page</div>
			</Link>
		</div>
	) : (
		<div className="search-form__search-error">
			The character was not found. Check the name and try again
		</div>
	);

	return (
		<div className="search-form">
			<Formik
				initialValues={{
					name: '',
				}}
				validationSchema={Yup.object({
					name: Yup.string().required('This field is required'),
				})}
				onSubmit={({ name }) => updateChar(name)}
			>
				<Form>
					<label className="search-form__label" htmlFor="name">
						Or find a character by name:
					</label>
					<div className="search-form__search-wrapper">
						<Field type="text" name="name" id="name" placeholder="Enter name" />
						<button
							className="button button__main"
							type="submit"
							disabled={loading}
						>
							<div className="inner">Find</div>
						</button>
					</div>
					<FormikErrorMessage
						className="search-form__search-error"
						name="name"
						component="div"
					/>
				</Form>
			</Formik>
			{charFoundMessage}
			{errorMessage}
		</div>
	);
};

export default SearchCharForm;
