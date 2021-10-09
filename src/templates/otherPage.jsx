import React from "react";

import { graphql } from "gatsby";

import { StructuredText } from "react-datocms";

import Navigator from "../components/langHelpers/navigator";

import PageWrapper from "../components/layout/pageWrapper";

import Hero from "../components/ui/hero";

import {
  SectionContainerGridThreeCols,
  SectionContainerFlexTwoCols,
  SectionWrapper,
  SectionContainerFlexTwoColsReverse,
  ColumnFlexTwoCols,
  TextBox,
} from "../components/layout/sectionStyles";

import {
  HeadingMedium,
  HeadingSmall,
} from "../components/layout/headingStyles";

import { Paragraph } from "../components/layout/paragraphStyles";

const OtherPageTemplate = ({ data }) => {
  const { seo, structuredBody } = data.datoCmsOtherPage;

  return (
    <PageWrapper
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoImage={seo.image.url}
      hasSubsequent
    >
      {structuredBody.value && (
        <StructuredText
          data={structuredBody}
          renderBlock={({
            record: {
              typeName,
              heroAlt,
              heroTitle,
              heroSubtitle,
              image,
              title,
              text,
              slug,
              firstFeatureTitle,
              firstFeatureDescription,
              secondFeatureTitle,
              secondFeatureDescription,
              thirdFeatureTitle,
              thirdFeatureDescription,
            },
          }) => {
            switch (typeName) {
              case "hero":
                return (
                  <Hero
                    alt={heroAlt}
                    title={heroTitle}
                    subtitle={heroSubtitle}
                  />
                );
              case "section image left":
                return (
                  <SectionWrapper hasSubsequent>
                    <SectionContainerFlexTwoCols>
                      <ColumnFlexTwoCols hasImg>
                        <img src={image.url} alt={image.alt} />
                      </ColumnFlexTwoCols>
                      <ColumnFlexTwoCols>
                        <TextBox as="div">
                          <HeadingMedium>{title}</HeadingMedium>
                          <Paragraph as="div">
                            <StructuredText
                              data={text}
                              renderLinkToRecord={({
                                record,
                                children,
                                transformedMeta,
                              }) => {
                                switch (typeName) {
                                  case "page":
                                    return (
                                      <Navigator
                                        {...transformedMeta}
                                        page
                                        to={slug}
                                      >
                                        {children}
                                      </Navigator>
                                    );
                                  case "home":
                                    return (
                                      <Navigator {...transformedMeta} home>
                                        {children}
                                      </Navigator>
                                    );

                                  default:
                                    return null;
                                }
                              }}
                            />
                          </Paragraph>
                        </TextBox>
                      </ColumnFlexTwoCols>
                    </SectionContainerFlexTwoCols>
                  </SectionWrapper>
                );
              case "section image right":
                return (
                  <SectionWrapper hasSubsequent>
                    <SectionContainerFlexTwoColsReverse>
                      <ColumnFlexTwoCols>
                        <TextBox as="div">
                          <HeadingMedium>{title}</HeadingMedium>
                          <Paragraph as="div">
                            <StructuredText
                              data={text}
                              renderLinkToRecord={({
                                children,
                                transformedMeta,
                              }) => {
                                switch (typeName) {
                                  case "page":
                                    return (
                                      <Navigator
                                        {...transformedMeta}
                                        page
                                        to={slug}
                                      >
                                        {children}
                                      </Navigator>
                                    );
                                  case "home":
                                    return (
                                      <Navigator {...transformedMeta} home>
                                        {children}
                                      </Navigator>
                                    );

                                  default:
                                    return null;
                                }
                              }}
                            />
                          </Paragraph>
                        </TextBox>
                      </ColumnFlexTwoCols>
                      <ColumnFlexTwoCols hasImg>
                        <img src={image.url} alt={image.alt} />
                      </ColumnFlexTwoCols>
                    </SectionContainerFlexTwoColsReverse>
                  </SectionWrapper>
                );
              case "three features set":
                return (
                  <SectionWrapper hasSubsequent>
                    <SectionContainerGridThreeCols>
                      <TextBox small>
                        <HeadingSmall hasTip>{firstFeatureTitle}</HeadingSmall>
                        <Paragraph>{firstFeatureDescription}</Paragraph>
                      </TextBox>
                      <TextBox small>
                        <HeadingSmall hasTip>{secondFeatureTitle}</HeadingSmall>
                        <Paragraph>{secondFeatureDescription}</Paragraph>
                      </TextBox>
                      <TextBox small>
                        <HeadingSmall hasTip>{thirdFeatureTitle}</HeadingSmall>
                        <Paragraph>{thirdFeatureDescription}</Paragraph>
                      </TextBox>
                    </SectionContainerGridThreeCols>
                  </SectionWrapper>
                );
              default:
                return null;
            }
          }}
        />
      )}
    </PageWrapper>
  );
};
export default OtherPageTemplate;

export const query = graphql`
  query OtherPageQuery($locale: String!, $id: String!) {
    datoCmsOtherPage(locale: { eq: $locale }, originalId: { eq: $id }) {
      seo {
        title
        description
        image {
          url
        }
      }
      structuredBody {
        value
        blocks {
          ... on DatoCmsHero {
            id: originalId
            typeName
            heroTitle
            heroSubtitle
            heroAlt
          }
          ... on DatoCmsSectionImageLeft {
            id: originalId
            title
            typeName
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                  typeName
                  slug
                }
                ... on DatoCmsHomepage {
                  id: originalId
                  typeName
                }
              }
            }
          }
          ... on DatoCmsSectionImageRight {
            id: originalId
            title
            typeName
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                  typeName
                  slug
                }
                ... on DatoCmsHomepage {
                  id: originalId
                  typeName
                }
              }
            }
          }
          ... on DatoCmsThreeFeaturesSet {
            id: originalId
            typeName
            firstFeatureTitle
            firstFeatureDescription
            secondFeatureTitle
            secondFeatureDescription
            thirdFeatureTitle
            thirdFeatureDescription
          }
        }
      }
    }
  }
`;
