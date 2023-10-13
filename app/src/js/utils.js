import { format } from 'date-fns';
/*
debug utility 
*/
const logThis = (msg) => {
  let prefix = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
  console.log(prefix + " - " + msg);
}
export { logThis };
/*
build css classes removing null and undefined values 
*/
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
export { classNames };
/*
build slug from name 
*/
const slugFromName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
}
export { slugFromName };
/*
build name from slug 
*/
const nameFromSlug = (slug) => {
  //replace hyphens with spaces
  let slugWithSpaces = slug.replace(/-/g, ' ');
  //split the string into words
  let words = slugWithSpaces.split(' ');
  //capitalize the first letter of each word
  let capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1);
    }
    return '';
  });
  //join the words back together
  let name = capitalizedWords.join(' ');

  return name;
}
export { nameFromSlug };
