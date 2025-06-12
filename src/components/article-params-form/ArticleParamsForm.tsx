import { useEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
	backgroundColors,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type TArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void;
	onReset: () => void;
	initialState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	initialState,
}: TArticleParamsFormProps) => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [formState, setFormState] = useState(initialState);
	const asideRef = useRef<HTMLDivElement>(null);

	const toggleSideBar = () => {
		setIsSideBarOpen(!isSideBarOpen);
	};

	useEffect(() => {
		const clickOutOfSideBar = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsSideBarOpen(false);
			}
		};

		if (isSideBarOpen) {
			document.addEventListener('mousedown', clickOutOfSideBar);
		}

		return () => {
			document.removeEventListener('mousedown', clickOutOfSideBar);
		};
	}, [isSideBarOpen]);

	const handleChangeForm = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleApply = () => {
		onApply(formState);
	};

	const handlyReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={isSideBarOpen} onClick={toggleSideBar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSideBarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text
						uppercase={true}
						as={'h2'}
						size={31}
						weight={800}
						align={'left'}
						fontStyle={'normal'}
						family={'open-sans'}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChangeForm('fontFamilyOption', value)}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(value) => handleChangeForm('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleChangeForm('fontColor', value)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleChangeForm('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleChangeForm('contentWidth', value)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handlyReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
