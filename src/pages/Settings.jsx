import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return <div className="flex flex-col gap-10">
    <h1 className="text-4xl -text--color-grey-700">Update hotel settings</h1>
    <UpdateSettingsForm />
  </div>
}

export default Settings;
