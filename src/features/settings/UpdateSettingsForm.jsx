import Form from '../../ui/Form';
import FormRow, { FormRowStyled } from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    settings: settingValues,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsLength,
      breakfastPrice
    } = {},
    error: errors,
    isLoading
  } = useSettings()

  const { isUpdating, updateSettingFn } = useUpdateSetting()

  function handleUpdate(e, field) {
    const { value } = e.target

    if (!value) return

    updateSettingFn({ [field]: value })
  }

  if (isLoading) return <Spinner />

  return (
    <form className='py-9 px-14 -bg--color-grey-0 border -border--color-grey-100 rounded-md text-2xl'>
      <FormSettingRow label='Minimum nights/booking'>
        <input
          defaultValue={minBookingLength}
          className={`bg-transparent border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='min-nights'
          onBlur={e => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormSettingRow>
      <FormSettingRow label='Maximum nights/booking'>
        <input
          defaultValue={maxBookingLength}
          className={`bg-transparent border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='max-nights'
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormSettingRow>
      <FormSettingRow label='Maximum guests/booking'>
        <input
          defaultValue={maxGuestsLength}
          className={`bg-transparent border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='max-guests'
          onBlur={e => handleUpdate(e, 'maxGuestsLength')}
          disabled={isUpdating}
        />
      </FormSettingRow>
      <FormSettingRow label='Breakfast price'>
        <input
          defaultValue={breakfastPrice}
          className={`bg-transparent border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='breakfast-price'
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormSettingRow>
    </form>
  );
}

function FormSettingRow({ label, error, children }) {
  return <FormRowStyled>
    <div className="grid grid-cols-[4fr_1fr_1fr] items-center gap-2">
      <label htmlFor={children.props?.id}>{label}</label>
      {children}
      {error && <p className="self-start flex-none w-fit px-3 py-1 rounded-md text-sm -text--color-red-700 -bg--color-red-100 border">{error.message}</p>}
    </div>
  </FormRowStyled>
}

export default UpdateSettingsForm;
