// AUTOBIND DECORATOR
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = document.getElementById('title')! as HTMLInputElement;
    this.descriptionInputElement = document.getElementById('description')! as HTMLInputElement;
    this.peopleInputElement = document.getElementById('people')! as HTMLInputElement;

    this.attach();
    this.configure();
  }

  private attach() {
    return this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const prjInput = new ProjectInput();
