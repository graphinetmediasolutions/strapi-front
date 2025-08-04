"use client"
import React from 'react'
import { GET_SCHOOLS_LIST } from '@/graphql/accordion';
import { useQuery } from '@apollo/client';
import Image from 'next/image';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStrapiMedia } from '@/lib/media';

type Program = {
    name: string;
};

type FeaturedImage = {
    url: string;
};

type Course = {
    title: string;
    slug: string;
    link: string | null;
    program: Program | null;
    featuredImage: FeaturedImage | null;
};

type School = {
    name: string;
    courses: Course[];
};

type GroupedProgram = {
    name: string;
    courses: Course[];
};

type RestructuredSchool = {
    name: string;
    programs: GroupedProgram[];
};

const AccordionSection: React.FC = () => {
    const { data, loading, error } = useQuery<{ schools: School[] }>(GET_SCHOOLS_LIST);

    const groupCoursesByProgram = (schoolsData: School[] = []): RestructuredSchool[] => {
        return schoolsData.map((school) => {
            const groupedPrograms: Record<string, GroupedProgram> = {};

            school.courses.forEach((course) => {
                const programName = course.program?.name || 'Uncategorized';

                if (!groupedPrograms[programName]) {
                    groupedPrograms[programName] = {
                        name: programName,
                        courses: [],
                    };
                }

                groupedPrograms[programName].courses.push(course);
            });

            return {
                name: school.name,
                programs: Object.values(groupedPrograms),
            };
        });
    };

    const restructuredData = groupCoursesByProgram(data?.schools);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className='py-8 max-w-7xl mx-auto px-2'>
            <Accordion type="single" collapsible defaultValue="0">
                {restructuredData.map((school, index) => (
                    <AccordionItem key={index} value={index.toString()}>
                        <AccordionTrigger>{school.name}</AccordionTrigger>
                        <AccordionContent>
                            <h3 className='mb-3'>
                            Programs Offered

                            </h3>
                            <Tabs defaultValue={school.programs[0]?.name} className="w-full">
                                <TabsList className="flex flex-wrap gap-2">
                                    {school.programs.map((program) => (
                                        <TabsTrigger key={program.name} value={program.name}>
                                            {program.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {school.programs.map((program) => (
                                    <TabsContent key={program.name} value={program.name} className="mt-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {program.courses.map((course) => {
                                                const iconUrl = getStrapiMedia(course.featuredImage?.url);
                                                return (
                                                    <div
                                                        key={course.slug}
                                                        className="p-4 border rounded-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
                                                    >
                                                        {iconUrl && (
                                                            <Image
                                                            width={20}
                                                            height={20}
                                                                src={iconUrl}
                                                                alt={course.title}
                                                                className="w-20 h-20 object-cover rounded-md"
                                                            />
                                                        )}
                                                        <div>
                                                            <h4 className="text-lg font-semibold">{course.title}</h4>
                                                            {course.link && (
                                                                <a
                                                                    href={course.link}
                                                                    className="text-blue-500 underline text-sm"
                                                                >
                                                                    View Course
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};

export default AccordionSection;
