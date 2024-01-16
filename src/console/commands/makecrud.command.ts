import { Json, Color, String } from '@athenna/common'
import { Argument, BaseCommand, Generator } from '@athenna/artisan'

export class MakeCrudCommand extends BaseCommand {
  @Argument({
    description: 'The name that will be used to generate the CRUD components.'
  })
  public name: string

  public static signature(): string {
    return 'make:crud'
  }

  public static description(): string {
    return 'Generate an e2e CRUD for the application.'
  }

  public async handle(): Promise<void> {
    this.logger.simple('({bold,green} [ MAKING CRUD ])\n')

    const properties: any[] = []

    let addMoreProperties = await this.prompt.confirm(
      'Do you want to add properties to your model?'
    )

    while (addMoreProperties) {
      console.log()

      const name = await this.prompt.input(
        `What will be the ${Color.cyan('name')} of your property?`
      )
      const type = await this.prompt.list(
        `What will be the ${Color.cyan('type')} of your property?`,
        ['string', 'boolean', 'number', 'bigint', 'Date']
      )
      const defaultTo =
        (await this.prompt.input(
          `What will be the ${Color.cyan(
            'default'
          )} value of your property? Default is "null".`
        )) || undefined

      const chosens = await this.prompt.checkbox(
        'Select all the options for your model:',
        [
          'isPrimary',
          'isHidden',
          'isUnique',
          'isIndex',
          'isSparse',
          'isMainPrimary',
          'isCreateDate',
          'isUpdateDate',
          'isDeleteDate'
        ]
      )

      const property: any = {
        name,
        type
      }

      chosens.forEach(chosen => {
        property[chosen] = true
      })

      if (defaultTo) {
        property.defaultTo = defaultTo
      }

      properties.push(property)

      console.log()

      this.logger.success(`Property ${Color.cyan(name)} successfully add.`)

      console.log()

      addMoreProperties = await this.prompt.confirm(
        'Do you want to continue adding properties to your model?'
      )
    }

    properties.unshift({ name: 'id', type: 'string' })
    properties.push({ name: 'createdAt', type: 'Date', isCreateDate: true })
    properties.push({ name: 'updatedAt', type: 'Date', isUpdateDate: true })
    properties.push({ name: 'deletedAt', type: 'Date', isDeleteDate: true })

    console.log()
    await this.makeController()
    console.log()
    await this.makeService()
    console.log()
    await this.makeModel(properties)

    // TODO Make migration
    // console.log()
    // await this.makeMigration()
  }

  private getImportPath(dest: string, name: string): string {
    return `${dest
      .replace(Path.pwd(), '')
      .replace(/\\/g, '/')
      .replace('/', '#')}/${name}`
  }

  private async makeController() {
    this.cleanGenerator()

    const file = await this.generator
      .fileName(this.name)
      .path(Path.controllers(`${String.toDotCase(this.name)}.controller.ts`))
      .template('crud:controller')
      .make()

    this.logger.success(
      `Controller ({yellow} "${file.name}") successfully created.`
    )

    const importPath = this.getImportPath(Path.controllers(), file.name)

    await this.rc.pushTo('controllers', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ controllers += "${importPath}" ])`
    )
  }

  private async makeService() {
    this.cleanGenerator()

    const file = await this.generator
      .fileName(this.name)
      .path(Path.services(`${String.toDotCase(this.name)}.service.ts`))
      .template('crud:service')
      .make()

    this.logger.success(
      `Service ({yellow} "${file.name}") successfully created.`
    )

    const importPath = this.getImportPath(Path.services(), file.name)

    await this.rc.pushTo('services', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ services += "${importPath}" ])`
    )
  }

  private async makeModel(columns: any[]) {
    this.cleanGenerator()

    const properties = []

    columns.forEach(column => {
      let options = ''
      const opts = Json.omit(column, ['name', 'type'])
      const keys = Object.keys(opts)

      keys.forEach((key, i) => {
        if (i + 1 === keys.length) {
          options += `${key}: ${opts[key]}`

          return
        }

        options += `${key}: ${opts[key]}, `
      })

      properties.push({
        name: column.name,
        type: column.type,
        annotation: `@Column(${options ? `{ ${options} }` : ''})`
      })
    })

    const file = await this.generator
      .fileName(this.name)
      .path(Path.models(`${String.toDotCase(this.name)}.ts`))
      .template('crud:model')
      .properties({ properties })
      .make()

    this.logger.success(`Model ({yellow} "${file.name}") successfully created.`)

    const importPath = this.getImportPath(Path.services(), file.name)

    await this.rc.pushTo('models', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ models += "${importPath}" ])`
    )
  }

  private cleanGenerator() {
    this.generator = new Generator()
  }
}
