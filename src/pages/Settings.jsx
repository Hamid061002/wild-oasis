import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return <div className="flex flex-col gap-10 -text--color-grey-700">
    <h1 className="text-4xl">Update hotel settings</h1>
    <UpdateSettingsForm />
  </div>
}

export default Settings;
