export interface App {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface AppSectionData {
  id: string;
  title?: string;
  apps: App[];
}
