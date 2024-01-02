const defaultMetaTags = ({ locale, metaProps }: { locale: string; metaProps: { title: string; description: string}}) => ({
    title: metaProps.title,
    description: metaProps.description,
    twitter: {
        title: metaProps.title,
        description: metaProps.description,
    },
    openGraph: {
        locale
    }
});

export default defaultMetaTags;