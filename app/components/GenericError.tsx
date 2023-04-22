import {Text, Button} from './ui';

export function GenericError({
  error,
}: {
  error?: {message: string; stack?: string};
}) {
  let description = `We found an error while loading this page.`;

  // TODO hide error in prod?
  if (error) {
    description += `\n${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <section className="w-full min-h-[50vh] grid place-items-center gap-4">
        <h1 className="text-left font-semibold tracking-tight text-2xl md:text-3xl lg:text-4  mb-8">
          Somethings wrong here.
        </h1>
        <Text width="narrow" as="p" className='text-left'>
          {description}
        </Text>
        {error?.stack && (
          <pre
            style={{
              padding: '2rem',
              background: 'hsla(10, 50%, 50%, 0.1)',
              color: 'red',
              overflow: 'auto',
              maxWidth: '100%',
            }}
            dangerouslySetInnerHTML={{
              __html: addLinksToStackTrace(error.stack),
            }}
          />
        )}
        <Button variant="light" width="auto" to={'/'}>
          Take me to the home page
        </Button>
    </section>
  );
}

function addLinksToStackTrace(stackTrace: string) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}
