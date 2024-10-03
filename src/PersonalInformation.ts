export const PersonalInformation = {
  instagramLink: "https://www.instagram.com/chris88xyz/",
  linkedinLink:
    "https://www.linkedin.com/in/christian-antonius-anggaresta-84b715243/",
  githubLink: "https://github.com/chrisprojs?tab=repositories",
  youtubeLink: "https://www.youtube.com/@christianantoniusanggarest3504",
  emailLink: "christiananggaresta20@gmail.com",
  phoneNumber: "+6285824853321"
};

export function formatPhoneNumber(phoneNumber: string) {
  // Format the phone number as desired, for example: +62 858-2485-3321
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}-${phoneNumber.slice(10, 14)}`;
}
