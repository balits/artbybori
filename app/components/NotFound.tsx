import {Button} from './Button';
import {FeaturedSection} from './FeaturedSection';
import {Link} from './Link';
import {PageHeader, Text} from './Text';

export function NotFound({type = 'page'}: {type?: string}) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <PageHeader heading={heading}>
        <Text width="narrow" as="p">
          {description}
        </Text>
        <Link to={'/'}>Take me to the home page</Link>
      </PageHeader>
      <FeaturedSection />
    </>
  );
}
