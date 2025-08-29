import { createTheme } from "@mantine/core";

const sharedInputStyles = "bg-zinc-800 text-white border border-zinc-700 text-center";
const sharedLabelStyles = "mb-3 text-center";

const mantineTheme = createTheme({
  colorScheme: "dark",
  components: {
    DateTimePicker: {
      classNames: {
        label: sharedLabelStyles,
        input: sharedInputStyles,
        dropdown: "bg-zinc-900 text-white text-center",
        day: "hover:bg-blue-500 rounded",
        weekday: "text-gray-400",
        calendarHeader: "text-white bg-zinc-800",
        monthThead: "text-white",
      },
    },
    TextInput: {
      classNames: {
        label: sharedLabelStyles,
        input: sharedInputStyles,
      },
    },
  },
});

export default mantineTheme;
