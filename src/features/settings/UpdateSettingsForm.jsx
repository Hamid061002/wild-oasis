import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
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
    <Form className=''>
      <FormRow label='Minimum nights/booking'>
        <input
          defaultValue={minBookingLength}
          className={`border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='min-nights'
          onBlur={e => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <input
          defaultValue={maxBookingLength}
          className={`border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='max-nights'
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <input
          defaultValue={maxGuestsLength}
          className={`border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='max-guests'
          onBlur={e => handleUpdate(e, 'maxGuestsLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <input
          defaultValue={breakfastPrice}
          className={`border-2 rounded-lg py-2 px-4 ${errors?.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type='number'
          id='breakfast-price'
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
