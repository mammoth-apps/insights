import { DataTypeProvider } from '@devexpress/dx-react-grid'
import type { ICategory } from '@mammoth-apps/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryApi } from 'src/api/category.api'
import type { RootState } from 'src/app'
import type { ITransactionGridRow } from '../../interfaces'
import {
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
} from './category-slice'

const filter = createFilterOptions<ICategory>()

type CellGridView = { value: string }
const CategoryCellFormatter = ({ value }: CellGridView) => {
  const categoryList = useSelector(
    (rootState: RootState) => rootState.categories.categories,
  )
  const categoryDetails = categoryList.find((category) => category.id === value)
  return <span>{categoryDetails?.name ?? 'I messed up'}</span>
}

const CategoryCellEditor = ({ value, onValueChange }: any) => {
  const dispatch = useDispatch()
  const categoryId: string | undefined = value // when it's add mode this is undefined
  const { matchingCategory, categoryList, selectedBudgetId } = useSelector(
    (rootState: RootState) => ({
      categoryList: rootState.categories.categories,
      matchingCategory: rootState.categories.categories.find(
        (category) => category.id === categoryId,
      ),
      selectedBudgetId: rootState.budgets.selectedBudget?.id,
    }),
  )
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    categoryId ? matchingCategory ?? null : null,
  )

  const onChange = useCallback(
    (category: ICategory | null) => {
      onValueChange(category?.id)
      setSelectedCategory(category)
    },
    [onValueChange],
  )

  const onAutoCompleteSelection = (category: ICategory | string) => {
    if (typeof category === 'string' || category.id === '') {
      // create the category and set the selectedCategory to the server category
      let categoryName = typeof category === 'string' ? category : category.name
      categoryName =
        categoryName.charAt(categoryName.length - 1) === '"'
          ? categoryName.slice(0, -1)
          : categoryName
      // * Two cases come in here one that looks like 'Create "Category A"' and one that looks like 'Category A'
      dispatch(createCategoryStart())
      categoryApi
        .createCategory({
          name: categoryName.replace('Create "', ''),
          budgetId: selectedBudgetId!,
        })
        .then(
          (success) => {
            dispatch(createCategorySuccess(success))
            onChange(success)
          },
          (error) => {
            dispatch(createCategoryFailure(error.toString()))
          },
        )
    } else {
      onChange(category)
    }
  }

  return (
    <Autocomplete
      id="category-cell"
      value={selectedCategory}
      options={categoryList}
      getOptionLabel={(option: ICategory) => option.name}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onAutoCompleteSelection(newValue)
        } else if (newValue && newValue.id === '') {
          onAutoCompleteSelection(newValue)
        } else {
          onChange(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
          filtered.push({
            id: '',
            name: `Create "${params.inputValue}"`,
            budgetId: '',
          })
        }
        return filtered
      }}
      freeSolo
      selectOnFocus
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const CategoryCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'categoryId')]}
      formatterComponent={CategoryCellFormatter}
      editorComponent={CategoryCellEditor}
    />
  )
}
